import * as ShellJS from 'shelljs';
import { Repository } from 'typedoc/dist/lib/converter/plugins/GitHubPlugin';
import { BasePath } from 'typedoc/dist/lib/converter/utils/base-path';

// Temporary kludge necessary as of typedoc 0.17.7
// This patches Typedoc to load the correct Github repository for generation of source code links
// See: https://github.com/TypeStrong/typedoc/pull/1318
Repository.tryCreateRepository = function tryCreateRepository(
  path: string,
  gitRevision: string,
  gitRemote: string,
): Repository | undefined {
  ShellJS.pushd(path);
  const out = <ShellJS.ExecOutputReturnValue>ShellJS.exec('git rev-parse --show-toplevel', { silent: true });
  const remotesOutput = <ShellJS.ExecOutputReturnValue>(
    ShellJS.exec(`git remote get-url ${gitRemote}`, { silent: true })
  );
  ShellJS.popd();

  if (!out || out.code !== 0) {
    return;
  }

  let remotes: string[] = remotesOutput.code === 0 ? remotesOutput.stdout.split('\n') : [];

  return new Repository(BasePath.normalize(out.stdout.replace('\n', '')), gitRevision, remotes);
};

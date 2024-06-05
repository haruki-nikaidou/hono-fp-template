import * as TO from 'fp-ts/TaskOption';
import * as TASK from 'fp-ts/Task';
import * as O from 'fp-ts/Option';
import {pipe} from 'fp-ts/function';

export function autoRetryTaskOption<T>(task: TO.TaskOption<T>, retryCount: number = 3): TO.TaskOption<T> {
  const retryTask = (remaining: number): TASK.Task<TO.TaskOption<T>> => () =>
    task().then(result => {
      if (O.isNone(result) && remaining > 0) {
        return retryTask(remaining - 1)();
      }
      return TO.fromOption(result);
    });

  return pipe(
    retryTask(retryCount),
    TO.fromTask,
    TO.flatten
  )
}
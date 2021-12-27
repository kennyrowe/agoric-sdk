// @ts-check

import { AmountPattern } from '@agoric/ertp';
import { M } from '@agoric/store';

export const AmountRecordKeywordPattern = M.recordOf(M.string(), AmountPattern);

/**
 * After defaults are filled in
 */
export const ProposalPattern = harden({
  want: M.recordOf(M.string(), M.pattern()),
  give: AmountRecordKeywordPattern,
  // To accept only one, we could use M.or rather than M.partial,
  // but the error messages would have been worse. Rather,
  // cleanProposal's assertExit checks that there's exactly one.
  exit: M.partial(
    {
      onDemand: null,
      waived: null,
      afterDeadline: {
        timer: M.remotable(),
        deadline: M.nat(),
      },
    },
    {},
  ),
});

export const isOnDemandExitRule = exit => {
  const [exitKey] = Object.getOwnPropertyNames(exit);
  return exitKey === 'onDemand';
};

/**
 * @param {ExitRule} exit
 * @returns {exit is WaivedExitRule}
 */
export const isWaivedExitRule = exit => {
  const [exitKey] = Object.getOwnPropertyNames(exit);
  return exitKey === 'waived';
};

/**
 * @param {ExitRule} exit
 * @returns {exit is AfterDeadlineExitRule}
 */
export const isAfterDeadlineExitRule = exit => {
  const [exitKey] = Object.getOwnPropertyNames(exit);
  return exitKey === 'afterDeadline';
};

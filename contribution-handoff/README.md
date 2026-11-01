# Glasshouse contributions, 1 November 2026

> Superseded: the workflow permission issue is resolved. The conflict-resolved updates are now on PRs #1090 (0d2386e) and #1091 (c51b038). Use those PRs and their current CI results for review; these patches are a historical snapshot.

These patches contain the contributions from PRs [1090](https://github.com/rorygallagher2024/glasshouse/pull/1090) and [1091](https://github.com/rorygallagher2024/glasshouse/pull/1091), resolved against upstream `de5ac2bf37d29c3013be3f80cc33fc4482f1a9ba` (0.137.0). They include translations in the six dashboard languages. The audio patch includes a screenshot rendered from synthetic C9/Sonos data. Neither patch changes workflows or includes private TV data.

The Git OAuth login refused to publish the upstream merge commits because importing upstream's existing workflow change requires `workflow` scope. The source PR branches remain unchanged. Both last-published heads passed all 11 CI checks: calibration `8a23eee453e90f6a630feaf0fc0f2e2d6a6d5b98`, audio `1bdb43fa2ce357d4d7344748083438f118d4f06f`.

Apply each patch on a separate branch rooted at the pinned upstream commit:

```sh
git switch -c review/cec-receiver de5ac2bf37d29c3013be3f80cc33fc4482f1a9ba
git apply --check /path/to/1091-cec-receiver.patch
git apply /path/to/1091-cec-receiver.patch
```

For calibration, use a separate branch and `1090-calibration-preview.patch`. Do not apply the patches together: the features have separate review and release boundaries.

Local merged-tree validation passed the unit suite, TypeScript, ES5, module calls, UI IDs, strings, screensavers, drift, entity checks, ShellCheck and strict docs. The audio tree passed released-updater checks from 0.80.8 and 0.137.0, plus focused CEC browser rendering and phone-width checks. The full dashboard smoke run twice reported only the existing Home-motion speed assertion (13.0 then 14.6 px/frame); other checks in that run completed. This was not changed or represented as a pass. CI must run on the refreshed branches.

The calibration draft remains read-only: no restoration executor, reset-survival claim or raw NVM writer. Its on-TV archive UI qualification remains outstanding. The previous C9 capture evidence is documented in the PR; the professionally calibrated owner TV was not reset. The CEC fallback was previously owner-confirmed on the actual C9 over 0.130; the 0.137 merge was checked offline, not redeployed to that TV.

Hearth installation is a separate owner task and is not part of these contributions.

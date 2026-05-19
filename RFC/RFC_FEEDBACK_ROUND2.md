# Design Gaps Not Addressed in RFC

1. Cancel button is always visible, not just on first/last step

- The design shows a "Cancel" button in the footer on every step. The RFC's WizardFooter mentions it but doesn't specify whether Cancel is always visible or conditionally shown (e.g., hidden on the last/review step). Your existing @glcp/react Wizard uses cancelStrings — the RFC doesn't account for this pattern at all.

2. The design has NO "Previous" button on Step 1

- The RFC doesn't specify that previous() should be hidden or disabled on the first step. This is a standard pattern but it's absent from the navigation policy spec.

3. Vertical layout step descriptions are visible in the sidebar

- The callout frame clearly shows step descriptions alongside step titles in the vertical stepper. The RFC mentions descriptions but doesn't specify that they should be visible in the sidebar by default vs. hidden (tooltip-only) in horizontal mode. This asymmetry needs documenting.

4. The existing @glcp/react Wizard API is divergent

- Your codebase uses @glcp/react's Wizard with props like buttonLabels, cancelStrings, actionOnExit, actionOnSubmit, formDefaultValues, and steps (as an array of JSX step objects). The proposed Grommet RFC API is completely different. There's a migration/conflict risk that the RFC doesn't acknowledge or address.

5. No error state shown in the design

- The RFC specifies error states (red indicator, error connector), but none appear in the Figma variants. Either the design is incomplete, or the RFC is over-specifying visual error states that haven't been designed yet.

6. Connector color between steps not visible at this zoom
   The design is too small to verify connector colors between steps. The RFC specifies success-green connectors after completed steps — this needs a closer design frame to validate.

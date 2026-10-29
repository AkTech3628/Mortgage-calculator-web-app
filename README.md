Mortage calculator web app with NRI currency conversion, persistent history and dark mode

A React application built to show clean architecture, not just a working UI: pure business logic kept out of the view layer, state owned at the right level, accessible forms, and a themeable design system built on CSS variables.

<img width="382" height="551" alt="image" src="https://github.com/user-attachments/assets/ef896986-b891-4615-b818-b76e5a27d5db" />

🎯 Overview

Most EMI calculators are a single form and a formula. This project treats the same problem as an engineering exercise: every concern lives in exactly one layer.

<img width="653" height="432" alt="image" src="https://github.com/user-attachments/assets/44d5bc9d-39e5-4520-99df-83ca77de24f9" />

The result is logic you can test with plain Node, UI that is easy to restyle, and state that is easy to reason about.

The app is aimed at Indian home-loan borrowers, including NRIs (Non-Resident Indians) who want to see their rupee EMI in a foreign currency. Amounts are formatted in the Indian numbering system (₹50,00,000).

⭐ Highlights for reviewers

If you are skimming the code, these are the files that show the most:

<img width="681" height="852" alt="image" src="https://github.com/user-attachments/assets/6e49c68e-2c00-41f2-8e50-20709193ed38" />


✨ Features

Calculator

Monthly EMI, total payment, total interest and interest share of the total outlay.
Instant, field-level validation with clear messages and ARIA wiring.
Handles the 0% interest edge case, where the standard formula would divide by zero.

NRI mode

Tick "I am an NRI" to see the EMI in USD alongside the rupee figure.
Currently uses a fixed demo rate (1 USD = ₹83). A live-rate service is planned for Phase 5 (see the Roadmap).

History

Every calculation is saved with a timestamp and survives page reloads (localStorage).
Delete a single entry or clear everything, each behind a confirmation prompt.
A friendly empty state when there is nothing yet.

Theming and UX

Light and dark themes, with the first visit following the operating-system preference.
The choice is remembered between visits.
Responsive layout (two columns on desktop, one on tablet and mobile).
Respects prefers-reduced-motion.

<img width="667" height="792" alt="image" src="https://github.com/user-attachments/assets/606806b1-3e9e-4cea-abb2-0f554d7ffe5a" />

**** Architecture *****
1. Layered view
<img width="1568" height="856" alt="01-layered-architecture" src="https://github.com/user-attachments/assets/c2227d54-95fd-4be5-bc91-1a1e25e4bf8a" />

2. Component tree

What the app renders today. Home owns the latest result; the form owns its own inputs.

<img width="600" height="777" alt="image" src="https://github.com/user-attachments/assets/4f98655b-08a5-468b-ad7b-629f62194195" />

 3.State ownership
 <img width="662" height="471" alt="image" src="https://github.com/user-attachments/assets/0c876d46-1851-4a4c-a317-d18b1e8f0352" />

<img width="525" height="443" alt="image" src="https://github.com/user-attachments/assets/f05e9082-ffd2-4cf4-ae8a-bbd0c67971df" />




📁 Project structure

<img width="825" height="868" alt="image" src="https://github.com/user-attachments/assets/bac58728-9bf4-4496-8ac3-18ae307c5fe1" />



📐 The maths: how EMI is calculated

<img width="885" height="827" alt="image" src="https://github.com/user-attachments/assets/a03b3dd7-9786-4e93-9ddf-3fc2ab1abb46" />

<img width="860" height="727" alt="image" src="https://github.com/user-attachments/assets/8722d3d1-d7e6-4ea0-b8f3-e255242e234c" />



🚀 Getting started
<img width="835" height="873" alt="image" src="https://github.com/user-attachments/assets/fcbf9f56-c1e1-432f-a566-79adf129a100" />

🧪 Testing

The business logic is deliberately free of React, so it is testable with plain Node:

<img width="885" height="443" alt="image" src="https://github.com/user-attachments/assets/a924765b-7ca3-4fe8-abd3-dc3248acd9ae" />


🧠 Design decisions and trade-offs

1. Business logic outside React. calculateMortgage and validateInputs are pure functions: same input, same output, no side effects. They are trivial to test, reusable in Node or another framework, and cannot be broken by a re-render.

2. Validation returns errors, it does not throw. Exceptions are for exceptional situations. A user typing a bad number is normal. Returning an error object lets the UI show all problems together and avoids try/catch in every component.

3. Controlled components and a reusable InputField. React state is the single source of truth for every input. One component owns the label, the input, the error text and the ARIA attributes, so all three form fields behave identically.

4. Lift state up only as far as needed. MortgageForm owns its inputs. Home owns the result because it feeds both the form callback and ResultCard. History and theme live in Context because many unrelated components need them.

5. Context instead of Redux. There are two small slices of state and no async orchestration. Context plus custom hooks (useTheme, useMortgage) is enough, and the hooks throw if used outside their provider, so a missing provider fails loudly in development instead of silently returning undefined.

6. Defensive persistence. Every localStorage read and write is wrapped in try/catch, because storage can be unavailable (private browsing, quota exceeded, blocked by policy). The app keeps working without it.

7. Theming through CSS variables and a data-theme attribute. Colours, spacing, radii and shadows are design tokens in :root; dark mode overrides them under [data-theme="dark"]. One attribute flips the entire UI, with no per-component theme logic.

8. Native Intl for money and dates. Intl.NumberFormat('en-IN') produces correct lakh/crore grouping (₹50,00,000) with no dependency.

9. Round at the boundary, not during the calculation. Intermediate values stay as full-precision floats; toFixed(2) is applied only to the returned figures, which avoids compounding rounding error.

10. Short-circuit conditional rendering. {result.isNRI && <ExchangeRate emi={result.emi} />} keeps the NRI feature fully optional: no extra work happens for users who do not tick the box.

♿ Accessibility
Every input has a real <label> linked with htmlFor / id.
Invalid fields set aria-invalid, and error text is linked with aria-describedby and announced via role="alert".
Icon-only and icon-led buttons carry aria-labels (theme toggle, delete).
Visible :focus-visible outlines for keyboard users.
Animations are disabled for users who set prefers-reduced-motion.
Colours are tokenised, which makes contrast fixes a one-line change per theme.


<img width="862" height="593" alt="image" src="https://github.com/user-attachments/assets/64413da9-cd0b-497f-b0bf-1db54250ce6b" />


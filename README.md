# PR #6725: start-page RTL/LTR evidence

Real Django-rendered public start page (`/`) and signed-in dashboard (`/common/`), served locally with the PR's actual stylesheets and scripts. The event names, organizer and account are synthetic. Arabic is selected through the user's locale, not by changing the rendered direction manually. Some application strings have no Arabic translation and remain English.

Screenshots cover English (LTR) and Arabic (RTL) at 1440px desktop and 390px mobile widths. Files ending in `-drawer.png` show the drawer open. The recording visits the same eight page/language/viewport combinations and shows event-list scrolling, language menus and drawer open/close interactions. Full-page screenshots show upcoming and past event sections.

`checks.json` contains the capture checks. The capture script asserts the public start-page drawer opens against the correct edge and is off-screen after closing, and checks language menus remain inside the viewport.

The start-page-specific drawer fix was discovered while recording this evidence. No production data or live account pages were used.

Captured revision: d58306db4 (PR #6725). Video duration: 58.6 seconds.

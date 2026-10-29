# Eventyay PR #6726: before and after

Recorded on 2026-10-29 using real Django order and gift-card services, isolated PostgreSQL databases, and synthetic paid orders.

- Before: base revision `bfda66330951edbe5a59181d9818744c1f14aa42`.
- After: PR head `ba7b868678244cdb1e62529b7d4a53eb597111e3`.
- Input: EUR 50 gift-card product, persisted pre-voucher price EUR 50, paid position price/order total EUR 25 (50% voucher scenario).
- Actions: issue gift card, replay paid signal, cancel order, reactivate order.
- Actual recorded balances: before 25 / 25 / 0 / 25; after 50 / 50 / 0 / 50.
- Both runs retain one card and an unchanged EUR 25 order total.

This is a screen recording of a local backend evidence viewer, not the Eventyay checkout UI. The viewer invokes the real service methods live and displays their persisted ledger results. Only the asynchronous ticket-cache invalidation task is stubbed; ledger and order behavior are not mocked. Emails use the in-memory test backend and no external payment provider is contacted.

`verified-results.json` contains the captured service responses, including full revisions and ledger entries. The MP4 is the full recording; the GIF is its reduced-resolution animated preview.

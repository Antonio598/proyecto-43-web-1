import { Resend } from 'resend'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

interface BookingEmailData {
  to: string
  name: string
  orderId: string
  experienceTitle: string
  date: string
  people: number
  tierLabel: string
  depositPaid: number
  fullPrice: number
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  const remainingDue = data.fullPrice - data.depositPaid

  const resend = getResend()
  if (!resend) {
    console.warn('[Resend] RESEND_API_KEY not set — skipping confirmation email')
    return
  }

  try {
    await resend.emails.send({
      from: 'Tenerife Dreams <bookings@tenerifedreamexcursions.com>',
      to: data.to,
      subject: `Booking Confirmed — ${data.experienceTitle} (#${data.orderId})`,
      html: buildEmailHtml(data, remainingDue),
    })
  } catch (err) {
    // Log but never throw — email failure must not affect webhook 200 response
    console.error('[Resend] Failed to send confirmation email:', err)
  }
}

function buildEmailHtml(data: BookingEmailData, remainingDue: number): string {
  const formattedDate = new Date(data.date + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto">

    <!-- Header -->
    <div style="background:#1a3a5c;padding:28px 24px;text-align:center">
      <span style="color:#f5920a;font-size:26px;font-weight:900;letter-spacing:-1px">Tenerife</span>
      <span style="color:#f5920a;font-size:20px;margin:0 4px">✈</span>
      <span style="color:#ffffff;font-size:26px;font-weight:900;letter-spacing:-1px">Dreams</span>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;padding:32px 28px">
      <div style="text-align:center;margin-bottom:24px">
        <div style="width:56px;height:56px;background:#f0fdf4;border-radius:50%;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:28px">✅</div>
        <h1 style="color:#222;font-size:22px;margin:0 0 8px">Booking Confirmed!</h1>
        <p style="color:#555;margin:0;font-size:15px">Hi ${data.name}, your reservation is confirmed.</p>
      </div>

      <!-- Order reference -->
      <div style="background:#f5f5f5;border-radius:6px;padding:12px 16px;text-align:center;margin-bottom:24px">
        <span style="color:#888;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px">Order Reference</span><br>
        <span style="color:#1a3a5c;font-size:18px;font-weight:900;letter-spacing:2px">#${data.orderId}</span>
      </div>

      <!-- Booking details -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:10px 0;color:#888;font-size:13px;width:40%">Activity</td>
          <td style="padding:10px 0;color:#222;font-size:13px;font-weight:600">${data.experienceTitle}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:10px 0;color:#888;font-size:13px">Option</td>
          <td style="padding:10px 0;color:#222;font-size:13px;font-weight:600">${data.tierLabel}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:10px 0;color:#888;font-size:13px">Date</td>
          <td style="padding:10px 0;color:#222;font-size:13px;font-weight:600">${formattedDate}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:10px 0;color:#888;font-size:13px">People</td>
          <td style="padding:10px 0;color:#222;font-size:13px;font-weight:600">${data.people}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:10px 0;color:#888;font-size:13px">Deposit paid</td>
          <td style="padding:10px 0;color:#f5920a;font-size:14px;font-weight:900">€${data.depositPaid.toFixed(2)}</td>
        </tr>
        ${remainingDue > 0 ? `
        <tr>
          <td style="padding:10px 0;color:#888;font-size:13px">Remaining at venue</td>
          <td style="padding:10px 0;color:#555;font-size:13px;font-weight:600">€${remainingDue.toFixed(2)}</td>
        </tr>` : ''}
      </table>

      <!-- Info box -->
      <div style="background:#f0f7ff;border-left:3px solid #1a3a5c;padding:14px 16px;margin-bottom:24px;border-radius:0 6px 6px 0">
        <p style="margin:0;color:#1a3a5c;font-size:13px;line-height:1.6">
          ✓ You will receive a call to confirm the exact time<br>
          ✓ Free cancellation up to 48h before your date<br>
          ${remainingDue > 0 ? `✓ Remaining balance (€${remainingDue.toFixed(2)}) is paid at the venue` : '✓ Full payment completed'}
        </p>
      </div>

      <p style="color:#888;font-size:13px;text-align:center;margin:0">
        Questions? Call us at <a href="tel:+34822684504" style="color:#1a3a5c;font-weight:600">+34 822 68 45 04</a>
        or <a href="https://wa.me/34822684504" style="color:#25D366;font-weight:600">WhatsApp</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#152d52;padding:16px 24px;text-align:center">
      <p style="color:rgba(255,255,255,0.5);font-size:11px;margin:0">
        © ${new Date().getFullYear()} TenerifeDreamsExcursion.com · Licence I-0004273.1<br>
        C.C. Siam Mall, Adeje, Tenerife, Spain
      </p>
    </div>

  </div>
</body>
</html>
`
}

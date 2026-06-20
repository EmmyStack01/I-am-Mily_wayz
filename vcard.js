/* SAVE CONTACT — now reads from window.__vcardData (set by card-loader.js) */
function downloadVCard() {
    const v = window.__vcardData || {};
    const vcardData = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${v.fullName || ''}`,
        `TITLE:${v.title || ''}`,
        `EMAIL;TYPE=INTERNET,WORK:${v.email || ''}`,
        `TEL;TYPE=WORK,CELL,VOICE:${v.phone || ''}`,
        `URL:${v.website || ''}`,
        "NOTE:Built by Emmy STACK01 – emmystack01.com",
        "END:VCARD"
    ].join("\r\n");

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    const safeName = (v.fullName || 'Contact').replace(/\s+/g, '_');
    a.download = `${safeName}.vcf`;
    a.href = url;
    a.click();

    setTimeout(() => window.URL.revokeObjectURL(url), 100);
}
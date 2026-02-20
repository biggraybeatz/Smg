import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

document.addEventListener('DOMContentLoaded', async () => {
    // ... (Your existing Chart.js initialization code) ...

    const downloadPdfBtn = document.getElementById('downloadPdfStatement');
    const statementArea = document.getElementById('statementContent');

    downloadPdfBtn.addEventListener('click', async () => {
        // 1. Capture the content at high resolution
        const canvas = await html2canvas(statementArea, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#0f172a' // Matches Sapphire Dark theme
        });

        // 2. Calculate PDF dimensions (A4)
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // 3. Add branding/metadata to the PDF
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(55, 208, 255); // Sapphire Blue
        pdf.text("SMGPUB℠ OFFICIAL ROYALTY STATEMENT", 10, 15);
        
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Generated on: ${new Date().toLocaleString()}`, 10, 22);

        // 4. Add the captured dashboard image
        pdf.addImage(imgData, 'PNG', 0, 30, pdfWidth, pdfHeight);

        // 5. Save the file
        pdf.save(`SMGPUB-Statement-${Date.now()}.pdf`);
    });
});


import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';

document.addEventListener('DOMContentLoaded', async () => {
    const ctx = document.getElementById('royaltyChart').getContext('2d');
    const downloadBtn = document.getElementById('downloadStatement');
    const statementArea = document.getElementById('statementContent');

    // 1. Fetch Real-Time Data from Stripe via Backend
    const fetchData = async () => {
        try {
            const response = await fetch('/api/payouts');
            const data = await response.json();
            return data; // Expected: { labels: ['Jan', 'Feb', ...], amounts: [150, 200, ...] }
        } catch (err) {
            console.error("Failed to load Stripe data:", err);
            return { labels: [], amounts: [] };
        }
    };

    const { labels, amounts } = await fetchData();

    // 2. Initialize the Sapphire Chart
    const royaltyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monthly Royalties ($)',
                data: amounts,
                borderColor: '#37d0ff',
                backgroundColor: 'rgba(55, 208, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { grid: { display: false } }
            }
        }
    });

    // 3. Statement Generator (PNG Export)
    downloadBtn.addEventListener('click', async () => {
        // High-quality scaling for Retina displays
        const options = {
            scale: 2, 
            useCORS: true,
            backgroundColor: '#0f172a' // Matches your --dark background
        };

        const canvas = await html2canvas(statementArea, options);
        const image = canvas.toDataURL("image/png");
        
        // Auto-download the file
        const link = document.createElement('a');
        link.download = `SMGPUB-Statement-${new Date().toLocaleDateString()}.png`;
        link.href = image;
        link.click();
    });
});
import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', () => {
    initChart();
});

async function initChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = [10200, 11500, 10800, 13200, 12900, 14290];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Monthly Revenue ($)',
                data: data,
                borderColor: '#37d0ff',
                backgroundColor: 'rgba(55, 208, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// Global scope for HTML onclicks
window.upgradeToPro = async () => {
    const res = await fetch('/api/subs/create-session', { method: 'POST' });
    const { url } = await res.json();
    window.location.href = url;
};


import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Replace with your actual Base64 logo data
const SMGPUB_LOGO_BASE64 = "data:image/png;base64,..."; 

export const generateBrandedPDF = async (elementId) => {
    const element = document.getElementById(elementId);
    
    // 1. Capture Dashboard with high-fidelity settings
    const canvas = await html2canvas(element, {
        scale: 3, // Ultra-high resolution for printing
        useCORS: true,
        backgroundColor: '#0f172a'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // --- BRANDING LAYER ---
    
    // A. Add Logo (Top Right)
    pdf.addImage(SMGPUB_LOGO_BASE64, 'PNG', 160, 10, 35, 15);

    // B. Add Stylized Header
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(55, 208, 255); // #37d0ff (Sapphire)
    pdf.text("SMGPUB℠", 15, 22);

    // C. Add Statement Metadata
    pdf.setFontSize(9);
    pdf.setTextColor(100);
    pdf.setFont("helvetica", "normal");
    pdf.text("Artist Distribution Services", 15, 28);
    pdf.text(`ID: ${Math.random().toString(36).toUpperCase().substring(2, 10)}`, 15, 33);
    
    // D. Decorative Sapphire Line
    pdf.setDrawColor(55, 208, 255);
    pdf.setLineWidth(0.5);
    pdf.line(15, 38, 195, 38);

    // E. Place the Dashboard Content
    // We start at Y=45 to leave room for the branding header
    pdf.addImage(imgData, 'PNG', 10, 45, pdfWidth - 20, pdfHeight - 20);

    // F. Footer Legal Text
    const footerY = pdf.internal.pageSize.getHeight() - 15;
    pdf.setFontSize(8);
    pdf.setTextColor(150);
    pdf.text("This is an official document of SMGPUB℠. Protected by Blockchain Rights Management.", 15, footerY);

    // 2. Export
    pdf.save(`SMGPUB_Statement_${Date.now()}.pdf`);
};

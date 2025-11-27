const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePortfolioPDF() {
  try {
    // Check if index.html exists
    const htmlPath = path.join(__dirname, 'index.html');
    if (!fs.existsSync(htmlPath)) {
      console.log(`Error: HTML file not found at ${htmlPath}`);
      return;
    }

    // Launch the browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load the HTML file
    const fileUrl = `file://${htmlPath}`;
    await page.goto(fileUrl, {
      waitUntil: 'networkidle0'
    });

    // Generate PDF
    const pdfPath = path.join(__dirname, 'portfolio.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px'
      }
    });

    await browser.close();

    // Get file size
    const stats = fs.statSync(pdfPath);
    const fileSizeKB = stats.size / 1024;

    console.log(`Portfolio PDF successfully generated at: ${pdfPath}`);
    console.log(`File size: ${fileSizeKB.toFixed(2)} KB`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

generatePortfolioPDF();
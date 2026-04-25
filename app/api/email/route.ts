import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

const generateCertificateHTML = (firstName: string, lastName: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Certificate of Pledge</title>
    <style>
      body {
        font-family: 'Helvetica', 'Arial', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f0f4f8;
      }
      .certificate {
        border: 20px solid #09437d;
        padding: 60px;
        width: 800px;
        background: white;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        position: relative;
        border-image: linear-gradient(45deg, #09437d, #ff8533) 30;
      }
      .header {
        color: #09437d;
        font-size: 48px;
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 2px;
      }
      .sub-header {
        font-size: 24px;
        color: #ff8533;
        margin-bottom: 40px;
        font-weight: bold;
      }
      .content {
        font-size: 20px;
        line-height: 1.6;
        color: #333;
        margin-bottom: 50px;
      }
      .name {
        font-size: 36px;
        font-weight: bold;
        color: #09437d;
        text-decoration: underline;
        margin: 20px 0;
      }
      .footer {
        margin-top: 60px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      .seal {
        width: 120px;
        height: 120px;
        background: #09437d;
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 14px;
        border: 4px solid #ff8533;
      }
      .date {
        font-size: 16px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="certificate">
      <div class="header">Certificate of Pledge</div>
      <div class="sub-header">Cyber Chetana Ambassador</div>
      <div class="content">
        This is to certify that
        <div class="name">${firstName} ${lastName}</div>
        has taken the Cyber Safety Pledge and committed to being a 
        <b>Cyber Awareness Ambassador</b> with HacFy Cyber Chetana.
        <br>
        Together, we build a secure digital India.
      </div>
      <div class="footer">
        <div class="date">Date: ${new Date().toLocaleDateString()}</div>
        <div class="seal">HacFy<br>OFFICIAL</div>
      </div>
    </div>
  </body>
</html>
`;

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phoneNumber } = await req.json();
    if (!firstName || !lastName || !email || !phoneNumber) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const htmlContent = generateCertificateHTML(firstName, lastName);

    const isProd = process.env.NODE_ENV === 'production';
    
    let browser;
    
    if (isProd) {
      // Production (Vercel)
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    } else {
      // Local Development (Windows/Mac)
      // Attempt to find local Chrome or Edge
      const localPath = process.platform === 'win32' 
        ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' 
        : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        
      browser = await puppeteer.launch({
        executablePath: localPath,
        headless: true,
      });
    }

    const page = await browser.newPage();
    console.log("Setting content for PDF...");
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    console.log("Generating PDF buffer...");
    const pdfBuffer = await page.pdf({ 
      format: 'a4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });
    
    console.log("PDF Buffer generated. Size:", pdfBuffer.length);
    
    if (pdfBuffer.length < 100) {
      throw new Error("Generated PDF is too small, likely corrupted.");
    }

    await browser.close();

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Registration Certificate',
        text: 'Attached is your certificate of registration.',
        attachments: [
          {
            filename: 'certificate.pdf',
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ],
      });

      return NextResponse.json({ 
        message: 'PDF sent to email and downloaded!', 
        pdf: Buffer.from(pdfBuffer).toString('base64') 
      });
    } catch (emailError) {
      console.error('Email delivery failed:', emailError);
      // Still return the PDF so the user can download it "on the spot"
      return NextResponse.json({ 
        message: 'Certificate generated! (Email delivery failed, please check credentials)', 
        pdf: Buffer.from(pdfBuffer).toString('base64'),
        warning: 'Email configuration error'
      });
    }
  } catch (error: unknown) {
    console.error('Certificate generation error:', error);
    return NextResponse.json({ error: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const { to, subject, text } = await req.json();

//     if (!to || !subject || !text) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: Number(process.env.EMAIL_PORT),
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });

//   } catch (error) {
//     console.error("Error sending email:", error);
//     return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
//   }
// }

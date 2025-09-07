# BTCL Bulk SMS Service Website

A modern, responsive website for Bangladesh Telecommunications Company Limited (BTCL) to promote and sell their bulk SMS service.

## Features

- **Modern Design**: Clean, corporate design with BTCL branding and Bangladeshi cultural elements
- **Bilingual Support**: Complete English and Bangla internationalization using next-intl
- **Authentication**: Secure user authentication with NextAuth.js
- **Multi-step Registration**: Document upload with verification workflow
- **Package Management**: Multiple SMS packages with flexible pricing
- **Payment Integration**: SSL Commerz payment gateway with support for mobile banking
- **User Dashboard**: Comprehensive dashboard for managing SMS packages and usage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Database**: MySQL with Prisma ORM for data management

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MySQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Internationalization**: next-intl
- **Payment**: SSL Commerz
- **File Upload**: Custom file upload component

## Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL database
- SSL Commerz account (for payments)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd btcl-sms
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Update the following variables in `.env.local`:
```env
DATABASE_URL="mysql://root:123456@127.0.0.1:3306/btcl_sms"
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"
SSLCOMMERZ_STORE_ID="your-sslcommerz-store-id"
SSLCOMMERZ_STORE_PASSWORD="your-sslcommerz-store-password"
SSLCOMMERZ_IS_LIVE=false
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,bn
```

4. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed the database (optional)
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Database Schema

The application uses the following main models:

- **User**: User accounts with verification status
- **Package**: SMS packages with pricing and features
- **Order**: Purchase orders with payment tracking
- **Document**: User-uploaded verification documents
- **SMSUsage**: SMS usage tracking and analytics

## Key Features

### User Registration
- Multi-step registration process
- Document upload (NID/Passport, Trade License)
- Account verification workflow
- Email verification

### Package Management
- Multiple SMS packages (Starter, Business, Enterprise, Premium)
- Flexible quantity selection
- Real-time pricing calculation
- Package expiration tracking

### Payment Processing
- SSL Commerz integration
- Support for bKash, Nagad, Rocket, cards, and bank transfers
- Secure payment validation
- Order status tracking

### User Dashboard
- SMS usage statistics
- Package management
- Order history
- Profile management
- API access information

### Internationalization
- Complete English and Bangla translations
- Language toggle in header
- Localized number and date formatting
- Cultural design elements

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   ├── packages/
│   │   ├── about/
│   │   ├── services/
│   │   ├── pricing/
│   │   ├── contact/
│   │   └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   └── payment/
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── forms/
│   └── layout/
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   ├── sslcommerz.ts
│   ├── utils.ts
│   └── i18n.ts
├── messages/
│   ├── en.json
│   └── bn.json
└── types/
```

## Deployment

### Environment Setup
1. Set up production database
2. Configure SSL Commerz for live environment
3. Set production environment variables
4. Deploy to Vercel or similar platform

### Database Migration
```bash
# Generate and deploy migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact:
- Email: sms@btcl.gov.bd
- Phone: +880-2-8181234
- Address: BTCL Tower, Agargaon, Dhaka-1207, Bangladesh
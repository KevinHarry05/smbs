# Smart Building Management System - Frontend

A comprehensive campus issue management system built with Next.js 15, React 19, and TypeScript.

## 🚀 Features

- **Role-based Access Control**: Separate dashboards for Students, Workers, and Administrators
- **Real-time Issue Tracking**: Report, track, and resolve campus issues efficiently
- **Modern UI/UX**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Mobile-first approach with smooth animations
- **Dark/Light Mode**: Theme support with system preference detection
- **Form Validation**: Robust form handling with Zod schemas
- **Error Handling**: Comprehensive error boundaries and loading states

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Charts**: Recharts

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── dashboard/                # Dashboard pages
│   │   ├── admin/               # Admin dashboard
│   │   ├── student/             # Student dashboard
│   │   └── worker/              # Worker dashboard
│   ├── login/                   # Authentication pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/                   # Reusable components
│   ├── common/                  # Common components
│   ├── layouts/                 # Layout components
│   ├── ui/                      # shadcn/ui components
│   └── [role]-navbar.tsx        # Role-specific navbars
├── lib/                         # Utilities and configurations
│   ├── constants.ts             # App constants
│   ├── types.ts                 # TypeScript types
│   ├── mock-data.ts             # Mock data
│   ├── utils.ts                 # Utility functions
│   └── utils/                   # Utility modules
│       └── status-helpers.ts    # Status helper functions
├── public/                      # Static assets
└── styles/                      # Additional styles
```

## 🎯 User Roles

### 👨‍🎓 Student Portal
- Report campus issues with detailed descriptions
- Upload images for better issue documentation
- Track issue resolution progress
- View issue history and status updates

### 🔧 Worker Dashboard
- View assigned tickets
- Set estimated completion times (ETA)
- Update ticket status and progress
- Manage workload efficiently

### 👨‍💼 Admin Control Panel
- Monitor system-wide statistics
- Manage worker performance
- Issue penalties for poor performance
- Oversee issue resolution workflow

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd full-stack-smbs/frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient for student interface
- **Secondary**: Green gradient for worker interface  
- **Accent**: Purple gradient for admin interface
- **Status Colors**: Red (urgent), Yellow (moderate), Green (low priority)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

### Components
- Built with shadcn/ui for consistency
- Fully accessible with ARIA support
- Customizable with CSS variables
- Dark/light mode compatible

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Large touch targets and gestures
- **Performance**: Optimized images and lazy loading

## 🔧 Development

### Code Quality
- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (if configured)
- **Error Boundaries**: Comprehensive error handling

### Performance
- **Next.js Optimization**: Automatic code splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Built-in bundle analyzer
- **Lighthouse**: Performance monitoring

## 🚀 Deployment

### Build for Production
```bash
pnpm build
# or
npm run build
```

### Start Production Server
```bash
pnpm start
# or
npm start
```

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_NAME="Campus Issue Tracker"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ using Next.js and modern web technologies.

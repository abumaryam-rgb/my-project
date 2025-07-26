# ADUSTECH MSSN Class Registration System

A comprehensive web-based registration system for the Muslim Students' Society of Nigeria (MSSN) at Aliko Dangote University of Science and Technology (ADUSTECH). This system facilitates online registration for Islamic classes with payment processing and administrative management.

## 🌟 Features

### For Students
- **Beautiful Islamic-themed UI** with responsive design
- **Five Class Types**: Qur'anic, Hadith, Ta'alimat, Arabic, and Comparative Religion
- **Comprehensive Registration Forms** with all required fields
- **Secure Payment Processing** with receipt generation
- **Class Timetables** display after registration
- **Form Validation** and data persistence
- **Mobile-friendly** responsive design

### For Administrators
- **Admin Dashboard** with real-time statistics
- **Registration Management** with search and filter capabilities
- **Payment Tracking** and approval system
- **Class Timetable Management**
- **Reports and Analytics** with charts
- **Export Functionality** for data analysis

## 🎨 Design Features

- **Islamic Theme**: Beautiful Islamic patterns and color scheme
- **Modern UI**: Clean, professional design with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: Easy navigation and user-friendly interface
- **Loading States**: Smooth transitions and feedback

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Islamic theme
- **JavaScript**: Interactive functionality
- **Bootstrap 5**: Responsive framework
- **Font Awesome**: Icons
- **Chart.js**: Analytics and reporting

### Backend
- **PHP**: Server-side processing
- **MySQL**: Database management
- **PDO**: Secure database connections
- **RESTful APIs**: Clean API design

### Database
- **MySQL**: Relational database
- **Stored Procedures**: Optimized queries
- **Triggers**: Audit logging
- **Views**: Simplified data access

## 📁 Project Structure

```
adustech-mssn/
├── index.html                 # Main homepage
├── styles.css                 # Islamic-themed CSS
├── script.js                  # Frontend JavaScript
├── quranic-registration.html  # Qur'anic class registration
├── hadith-registration.html   # Hadith class registration
├── taalimat-registration.html # Ta'alimat class registration
├── arabic-registration.html   # Arabic class registration
├── comparative-registration.html # Comparative Religion registration
├── payment.html              # Payment processing page
├── admin/
│   ├── index.html            # Admin dashboard
│   └── admin.js              # Admin functionality
├── api/
│   ├── register.php          # Registration API
│   └── payment.php           # Payment API
├── config/
│   └── database.php          # Database configuration
├── database/
│   └── schema.sql            # Database schema
└── README.md                 # This file
```

## 🚀 Installation & Setup

### Prerequisites
- **Web Server**: Apache/Nginx with PHP support
- **PHP**: Version 7.4 or higher
- **MySQL**: Version 5.7 or higher
- **Web Browser**: Modern browser with JavaScript enabled

### Step 1: Server Setup
1. **Install XAMPP/WAMP/MAMP** or configure your web server
2. **Place project files** in your web server directory (e.g., `htdocs/` for XAMPP)
3. **Start Apache and MySQL** services

### Step 2: Database Setup
1. **Open phpMyAdmin** (usually at `http://localhost/phpmyadmin`)
2. **Create new database** named `adustech_mssn`
3. **Import schema**: Go to Import tab and select `database/schema.sql`
4. **Verify tables** are created successfully

### Step 3: Configuration
1. **Edit database config**: Open `config/database.php`
2. **Update credentials**:
   ```php
   private $host = 'localhost';
   private $db_name = 'adustech_mssn';
   private $username = 'root';  // Your MySQL username
   private $password = '';      // Your MySQL password
   ```

### Step 4: Access the System
1. **Open browser** and navigate to `http://localhost/adustech-mssn/`
2. **Test registration** by filling out a form
3. **Access admin panel** at `http://localhost/adustech-mssn/admin/`

## 📋 Registration Process

### Student Registration Flow
1. **Visit homepage** and view class rules
2. **Select class** from available options
3. **Fill registration form** with personal details
4. **Submit form** and proceed to payment
5. **Complete payment** (₦200 per class)
6. **Download receipt** and view timetable
7. **Receive confirmation** via email (if configured)

### Form Fields
- **Personal Information**: Name, Registration Number, Department, Level, Phone, Gender
- **Accommodation**: Hostel/Off-campus details
- **Origin**: State, LGA, Student Type
- **Class-specific**: Category, Hizb (for Qur'anic class)
- **Optional**: Islamic books covered

## 💳 Payment System

### Features
- **Secure processing** with validation
- **Multiple payment methods** (Card, Bank Transfer)
- **Receipt generation** in HTML format
- **Payment status tracking**
- **Admin approval system**

### Integration
- **Ready for payment gateways** (Paystack, Flutterwave)
- **Simulated processing** for demonstration
- **Real-time status updates**

## 🔧 Admin Features

### Dashboard
- **Real-time statistics** with charts
- **Recent activity** feed
- **Quick actions** for common tasks

### Registration Management
- **View all registrations** with search/filter
- **Edit registration details**
- **Delete registrations**
- **Export data** for analysis

### Payment Management
- **Track payment status**
- **Approve pending payments**
- **View transaction history**
- **Generate reports**

### Timetable Management
- **View class schedules**
- **Edit timetables**
- **Manage instructors**
- **Update venues**

## 🎯 Class Types

### 1. Qur'anic Class
- **Categories**: Reciters, Tahfeez (Memorization)
- **Hizb Options**: Five, Ten, Twenty, Thirty, Graduation
- **Schedule**: Monday, Wednesday, Friday

### 2. Hadith Class
- **Focus**: Prophet's sayings and teachings
- **Schedule**: Tuesday, Thursday

### 3. Ta'alimat Class
- **Focus**: Islamic teachings and principles
- **Schedule**: Monday, Wednesday

### 4. Arabic Class
- **Focus**: Arabic language mastery
- **Schedule**: Tuesday, Thursday

### 5. Comparative Religion Class
- **Focus**: Religious comparison from Islamic perspective
- **Schedule**: Friday

## 🔒 Security Features

### Data Protection
- **Input sanitization** and validation
- **SQL injection prevention** with prepared statements
- **XSS protection** with output encoding
- **CSRF protection** (implement as needed)

### Payment Security
- **PCI-DSS compliance** ready
- **Encrypted data transmission**
- **Secure payment gateway integration**

## 📊 Database Schema

### Main Tables
- **registrations**: Student registration data
- **payment_transactions**: Payment records
- **admin_users**: Admin account management
- **class_timetables**: Class schedules
- **audit_log**: System activity tracking

### Views
- **registration_summary**: Combined registration data
- **class_statistics**: Registration statistics by class

### Stored Procedures
- **GetRegistrationByNumber**: Find registration by number
- **GetRegistrationsByClass**: Filter by class type
- **GetPaymentStatistics**: Payment analytics
- **UpdatePaymentStatus**: Update payment status

## 🎨 Customization

### Theme Customization
- **Colors**: Modify CSS variables in `styles.css`
- **Fonts**: Update Google Fonts imports
- **Icons**: Replace Font Awesome icons
- **Patterns**: Customize Islamic patterns

### Content Customization
- **Class types**: Add/modify in database
- **Departments**: Update dropdown options
- **States**: Modify Nigerian states list
- **Rules**: Update class rules and regulations

## 🚀 Deployment

### Local Development
1. **Use XAMPP/WAMP** for local testing
2. **Enable error reporting** for debugging
3. **Test all features** thoroughly

### Production Deployment
1. **Secure server** with SSL certificate
2. **Configure database** with proper credentials
3. **Set up email** for notifications
4. **Integrate payment gateway** (Paystack/Flutterwave)
5. **Enable error logging** and monitoring
6. **Set up backups** for database

## 📈 Future Enhancements

### Planned Features
- **Email notifications** for registrations
- **SMS notifications** for payment confirmations
- **Mobile app** for easier access
- **Advanced reporting** with PDF generation
- **Multi-language support** (Arabic, Hausa)
- **Attendance tracking** system
- **Certificate generation** for completed classes

### Technical Improvements
- **API rate limiting** for security
- **Caching system** for performance
- **Advanced search** with filters
- **Bulk operations** for admin
- **Real-time notifications** using WebSockets

## 🤝 Contributing

### Development Guidelines
1. **Follow coding standards** (PSR-12 for PHP)
2. **Add comments** for complex logic
3. **Test thoroughly** before submitting
4. **Update documentation** for new features

### Bug Reports
- **Describe the issue** clearly
- **Include steps** to reproduce
- **Provide error messages** if any
- **Specify browser/OS** details

## 📞 Support

### Contact Information
- **Email**: mssn@adustech.edu.ng
- **Phone**: +234 XXX XXX XXXX
- **Address**: ADUSTECH Campus, Wudil, Kano State

### Technical Support
- **Database issues**: Check MySQL configuration
- **Payment problems**: Verify API credentials
- **Display issues**: Clear browser cache
- **Performance**: Optimize database queries

## 📄 License

This project is developed for ADUSTECH MSSN. All rights reserved.

## 🙏 Acknowledgments

- **ADUSTECH MSSN** for the project requirements
- **Bootstrap** for the responsive framework
- **Font Awesome** for the beautiful icons
- **Chart.js** for the analytics charts
- **Islamic community** for inspiration and guidance

---

**Developed with ❤️ for the Islamic community at ADUSTECH**

*May Allah (SWT) accept this work and make it beneficial for the Ummah.* 
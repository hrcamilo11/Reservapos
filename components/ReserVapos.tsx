'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import {
  Facebook,
  Instagram,
  Twitter,
  ShoppingCart,
  Menu,
  User,
  MessageCircle,
  Sun,
  Moon,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Montserrat } from 'next/font/google';
import { Textarea } from '@/components/ui/textarea';

const montserrat = Montserrat({ subsets: ['latin'] });

const languages = {
  es: {
    title: 'ReserVapos',
    catalog: 'Catálogo',
    myOrders: 'Mis Pedidos',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    logout: 'Cerrar Sesión',
    welcome: 'Bienvenido',
    addToCart: 'Añadir al Carrito',
    outOfStock: 'Agotado',
    price: 'Precio',
    available: 'Disponible',
    orderStatus: 'Estado del Pedido',
    orderDate: 'Fecha del Pedido',
    total: 'Total',
    actions: 'Acciones',
    viewDetails: 'Ver Detalles',
    admin: 'Administrador',
    inventory: 'Inventario',
    users: 'Usuarios',
    passwordResets: 'Restablecimientos de Contraseña',
    ageVerification: 'Verificación de Edad',
    ageQuestion: '¿Tienes 18 años o más y entiendes los riesgos de usar vaporizadores?',
    yes: 'Sí',
    no: 'No',
    disclaimer: 'Descargo de responsabilidad',
    disclaimerText:
      'ReserVapos no acepta responsabilidad por el mal uso de las reservas. Al continuar, reconoces que usas nuestros productos bajo tu propio riesgo.',
    understand: 'Entiendo',
    email: 'Correo electrónico',
    password: 'Contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    name: 'Nombre',
    phoneNumber: 'Número de teléfono',
    profile: 'Perfil',
    cart: 'Carrito',
    confirmReservation: 'Confirmar Reserva',
    processing: 'Procesando...',
    remove: 'Eliminar',
    color: 'Color',
    priceUPB: 'Precio UPB',
    priceExternal: 'Precio Externo',
    image: 'Imagen',
    addNewVaporizer: 'Añadir Nuevo Vaporizador',
    save: 'Guardar',
    close: 'Cerrar',
    ban: 'Banear',
    unban: 'Desbanear',
    createNewUser: 'Crear Nuevo Usuario',
    resetPassword: 'Restablecer Contraseña',
    approve: 'Aprobar',
    reject: 'Rechazar',
    termsAndConditions: 'Términos y Condiciones',
    contactUs: 'Contáctanos',
    itemAddedToCart: 'Producto añadido al carrito',
    itemRemovedFromCart: 'Producto eliminado del carrito',
    reservationSubmitted: 'Reserva enviada para aprobación del administrador',
    warrantyPeriod:
      'El período de garantía para nuestros productos es de 15 días desde la fecha de compra.',
    invalidCredentials: 'Credenciales inválidas',
    accountBanned: 'Tu cuenta ha sido baneada.',
    registrationSuccessful: 'Registro exitoso',
    loggedOut: 'Has cerrado sesión',
    newVaporizerAdded: 'Nuevo vaporizador añadido al inventario',
    vaporizerRemoved: 'Vaporizador eliminado del inventario',
    vaporizerUpdated: 'Vaporizador actualizado',
    cantBanYourself: 'No puedes banearte a ti mismo',
    userBanned: 'Usuario baneado',
    userUnbanned: 'Usuario desbaneado',
    newUserCreated: 'Nuevo usuario creado',
    profileUpdated: 'Perfil actualizado exitosamente',
    passwordResetRequested:
      'Solicitud de restablecimiento de contraseña enviada. Un administrador te contactará pronto.',
    userNotFound: 'Usuario no encontrado',
    passwordReset: 'Contraseña restablecida para',
    newPassword: 'Nueva contraseña:',
    cantApproveOwnReservation: 'No puedes aprobar tu propia reserva',
    reservationApproved: 'Reserva aprobada',
    reservationCancelled: 'Reserva cancelada',
    warrantyClaimApproved: 'Reclamo de garantía aprobado',
    warrantyClaimRejected: 'Reclamo de garantía rechazado',
    maxWarrantyClaims: 'Has alcanzado el número máximo de reclamos de garantía para este producto.',
    warrantyClaimSubmitted: 'Reclamo de garantía enviado para aprobación del administrador',
    puffs: 'Caladas',
    notEnoughStock: 'No hay suficiente stock disponible',
    pendingWarrantyClaim: 'Ya tienes un reclamo de garantía pendiente para este producto',
    alreadyProcessed: 'Este producto ya ha sido procesado',
    externalOrderAddress: 'Por favor, proporciona una dirección de entrega para tu pedido externo',
    addressRequired: 'Se requiere una dirección para pedidos externos',
    addressSaved: 'Dirección guardada exitosamente',
    cookieConsent:
      'Este sitio utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestro uso de cookies.',
    acceptCookies: 'Aceptar Cookies',
    rejectCookies: 'Rechazar Cookies',
    ageVerificationFailed: 'Acceso Denegado',
    ageVerificationFailedMessage: 'Debes tener 18 años o más para acceder a este sitio.',
    selectLocation: 'Seleccionar Ubicación',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    system: 'Sistema',
    addressDetails: 'Detalles de la dirección',
    department: 'Departamento',
    city: 'Ciudad',
    neighborhood: 'Barrio',
    address: 'Dirección',
    propertyType: 'Tipo de inmueble',
    blockOrInterior: 'Bloque o Interior',
    deliveryInstructions: 'Instrucciones para el repartidor',
    termsContent: `
<h2>Términos y Condiciones de ReserVapos</h2>

<h3>1. Aceptación de Términos</h3>
<p>Al acceder o utilizar el servicio de ReserVapos, usted acepta estar sujeto a estos Términos y Condiciones.</p>

<h3>2. Restricción de Edad</h3>
<p>Debe tener 18 años o más para usar ReserVapos. Nos reservamos el derecho de solicitar prueba de edad en cualquier momento.</p>

<h3>3. Uso del Producto</h3>
<p>Los productos de ReserVapos están destinados solo para uso adulto. El mal uso o abuso de nuestros productos está estrictamente prohibido.</p>

<h3>4. Riesgos de Salud</h3>
<p>Los usuarios reconocen que los productos de vapeo contienen nicotina, que es adictiva. Úselo bajo su propio riesgo.</p>

<h3>5. Registro de Cuenta</h3>
<p>Usted es responsable de mantener la confidencialidad de la información de su cuenta y de todas las actividades bajo su cuenta.</p>

<h3>6. Pedidos y Pagos</h3>
<p>Todos los pedidos están sujetos a disponibilidad y confirmación del precio del pedido. El pago debe realizarse en su totalidad antes del procesamiento del pedido.</p>

<h3>7. Entrega</h3>
<p>Los tiempos de entrega son estimaciones y no pueden garantizarse. El riesgo de pérdida y el título de los artículos comprados pasan a usted en el momento de la entrega.</p>

<h3>8. Devoluciones y Reembolsos</h3>
<p>Se aceptan devoluciones dentro de los 15 días posteriores a la compra, sujeto a nuestra política de devoluciones. Los reembolsos se procesarán dentro de los 14 días hábiles.</p>

<h3>9. Garantía</h3>
<p>Los productos están cubiertos por una garantía de 15 días a partir de la fecha de compra. Esta garantía no cubre el mal uso o el desgaste normal.</p>

<h3>10. Limitación de Responsabilidad</h3>
<p>ReserVapos no es responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo resultante de su uso del servicio.</p>

<h3>11. Propiedad Intelectual</h3>
<p>Todo el contenido en ReserVapos, incluyendo texto, gráficos, logotipos y software, es propiedad de ReserVapos y está protegido por las leyes de derechos de autor.</p>

<h3>12. Terminación</h3>
<p>Nos reservamos el derecho de terminar o suspender su cuenta y acceso al servicio a nuestra sola discreción, sin previo aviso, por conducta que creemos viola estos Términos o es perjudicial para otros usuarios, para nosotros o para terceros, o por cualquier otra razón.</p>

<h3>13. Cambios en los Términos</h3>
<p>ReserVapos se reserva el derecho de modificar estos términos en cualquier momento. Notificaremos a los usuarios de cualquier cambio significativo.</p>

<h3>14. Ley Aplicable</h3>
<p>Estos Términos se regirán e interpretarán de acuerdo con las leyes de [Su Jurisdicción], sin tener en cuenta sus disposiciones sobre conflictos de leyes.</p>

<h3>15. Información de Contacto</h3>
<p>Para cualquier pregunta sobre estos Términos, por favor contáctenos en [Su Información de Contacto].</p>
`,
  },
  en: {
    title: 'ReserVapos',
    catalog: 'Catalog',
    myOrders: 'My Orders',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    welcome: 'Welcome',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    price: 'Price',
    available: 'Available',
    orderStatus: 'Order Status',
    orderDate: 'Order Date',
    total: 'Total',
    actions: 'Actions',
    viewDetails: 'View Details',
    admin: 'Admin',
    inventory: 'Inventory',
    users: 'Users',
    passwordResets: 'Password Resets',
    ageVerification: 'Age Verification',
    ageQuestion: 'Are you 18 years or older and understand the risks of using vaporizers?',
    yes: 'Yes',
    no: 'No',
    disclaimer: 'Disclaimer',
    disclaimerText:
      'ReserVapos does not accept responsibility for misuse of reservations. By proceeding, you acknowledge that you use our products at your own risk.',
    understand: 'I Understand',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    name: 'Name',
    phoneNumber: 'Phone Number',
    profile: 'Profile',
    cart: 'Cart',
    confirmReservation: 'Confirm Reservation',
    processing: 'Processing...',
    remove: 'Remove',
    color: 'Color',
    priceUPB: 'Price UPB',
    priceExternal: 'Price External',
    image: 'Image',
    addNewVaporizer: 'Add New Vaporizer',
    save: 'Save',
    close: 'Close',
    ban: 'Ban',
    unban: 'Unban',
    createNewUser: 'Create New User',
    resetPassword: 'Reset Password',
    approve: 'Approve',
    reject: 'Reject',
    termsAndConditions: 'Terms and Conditions',
    contactUs: 'Contact Us',
    itemAddedToCart: 'Item added to cart',
    itemRemovedFromCart: 'Item removed from cart',
    reservationSubmitted: 'Reservation submitted for admin approval',
    warrantyPeriod: 'The warranty period for our products is 15 days from the date of purchase.',
    invalidCredentials: 'Invalid email or password',
    accountBanned: 'Your account has been banned.',
    registrationSuccessful: 'Registration successful',
    loggedOut: 'You have been logged out',
    newVaporizerAdded: 'New vaporizer added to inventory',
    vaporizerRemoved: 'Vaporizer removed from inventory',
    vaporizerUpdated: 'Vaporizer updated',
    cantBanYourself: "You can't ban yourself",
    userBanned: 'User banned',
    userUnbanned: 'User unbanned',
    newUserCreated: 'New user created',
    profileUpdated: 'Profile updated successfully',
    passwordResetRequested: 'Password reset request submitted. An admin will contact you shortly.',
    userNotFound: 'User not found',
    passwordReset: 'Password reset for',
    newPassword: 'New password:',
    cantApproveOwnReservation: "You can't approve your own reservation",
    reservationApproved: 'Reservation approved',
    reservationCancelled: 'Reservation cancelled',
    warrantyClaimApproved: 'Warranty claim approved',
    warrantyClaimRejected: 'Warranty claim rejected',
    maxWarrantyClaims: 'You have reached the maximum number of warranty claims for this product.',
    warrantyClaimSubmitted: 'Warranty claim submitted for admin approval',
    puffs: 'Puffs',
    notEnoughStock: 'Not enough stock available',
    pendingWarrantyClaim: 'You already have a pending warranty claim for this product',
    alreadyProcessed: 'This product has already been processed',
    externalOrderAddress: 'Please provide a delivery address for your external order',
    addressRequired: 'An address is required for external orders',
    addressSaved: 'Address saved successfully',
    cookieConsent:
      'This site uses cookies to improve your experience. By continuing to browse, you accept our use of cookies.',
    acceptCookies: 'Accept Cookies',
    rejectCookies: 'Reject Cookies',
    ageVerificationFailed: 'Access Denied',
    ageVerificationFailedMessage: 'You must be 18 years or older to access this site.',
    selectLocation: 'Select Location',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    addressDetails: 'Address Details',
    department: 'Department',
    city: 'City',
    neighborhood: 'Neighborhood',
    address: 'Address',
    propertyType: 'Property Type',
    blockOrInterior: 'Block or Interior',
    deliveryInstructions: 'Delivery Instructions',
    termsContent: `
<h2>Terms and Conditions for ReserVapos</h2>

<h3>1. Acceptance of Terms</h3>
<p>By accessing or using the ReserVapos service, you agree to be bound by these Terms and Conditions.</p>

<h3>2. Age Restriction</h3>
<p>You must be 18 years or older to use ReserVapos. We reserve the right to request proof of age at any time.</p>

<h3>3. Product Use</h3>
<p>ReserVapos products are intended for adult use only. Misuse or abuse of our products is strictly prohibited.</p>

<h3>4. Health Risks</h3>
<p>Users acknowledge that vaping products contain nicotine, which is addictive. Use at your own risk.</p>

<h3>5. Account Registration</h3>
<p>You are responsible for maintaining the confidentiality of your account information and for all activities under your account.</p>

<h3>6. Ordering and Payment</h3>
<p>All orders are subject to availability and confirmation of the order price. Payment must be made in full before order processing.</p>

<h3>7. Delivery</h3>
<p>Delivery times are estimates and cannot be guaranteed. Risk of loss and title for items purchased pass to you upon delivery.</p>

<h3>8. Returns and Refunds</h3>
<p>Returns are accepted within 15 days of purchase, subject to our return policy. Refunds will be processed within 14 business days.</p>

<h3>9. Warranty</h3>
<p>Products are covered by a 15-day warranty from the date of purchase. This warranty does not cover misuse or normal wear and tear.</p>

<h3>10. Limitation of Liability</h3>
<p>ReserVapos is not liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service.</p>

<h3>11. Intellectual Property</h3>
<p>All content on ReserVapos, including text, graphics, logos, and software, is the property of ReserVapos and protected by copyright laws.</p>

<h3>12. Termination</h3>
<p>We reserve the right to terminate or suspend your account and access to the service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.</p>

<h3>13. Changes to Terms</h3>
<p>ReserVapos reserves the right to modify these terms at any time. We will notify users of any significant changes.</p>

<h3>14. Governing Law</h3>
<p>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>

<h3>15. Contact Information</h3>
<p>For any questions about these Terms, please contact us at [Your Contact Information].</p>
`,
  },
};

export default function ReserVapos() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [selectedVaporizer, setSelectedVaporizer] = useState(null);
  const [theme, setTheme] = useState('light');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showPasswordResetDialog, setShowPasswordResetDialog] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('UPB');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProcessingReservation, setIsProcessingReservation] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('catalog');
  const [viewingUser, setViewingUser] = useState(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [newAddress, setNewAddress] = useState({
    department: '',
    city: '',
    neighborhood: '',
    streetType: '',
    streetNumber: '',
    houseNumber: '',
    propertyType: '',
    blockOrInterior: '',
    deliveryInstructions: '',
    formattedAddress: '',
  });
  const [tempProfile, setTempProfile] = useState(null);
  const [showAgeVerificationFailure, setShowAgeVerificationFailure] = useState(false);
  const [locationLocked, setLocationLocked] = useState(false);

  // @ts-expect-error: Err languages
  const t = languages[selectedLanguage];

  const carouselItems = [
    {
      id: 1,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729484422/ReserVapos/KuzSlider1.png',
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729484422/ReserVapos/KuzSlider2.jpg',
    },
    {
      id: 3,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729484422/ReserVapos/KuzSlider3.jpg',
    },
  ];

  const [vaporizers, setVaporizers] = useState([
    {
      id: 1,
      name: 'Watermelon Ice',
      color: 'green',
      priceUPB: 18000,
      priceExternal: 32000,
      available: 10,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729479521/ReserVapos/kuzwatermelonice.png',
      puffs: 9000,
    },
    {
      id: 2,
      name: 'Super Berry',
      color: 'purple',
      priceUPB: 18000,
      priceExternal: 32000,
      available: 10,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729479521/ReserVapos/KuzSuperBerry.png',
      puffs: 9000,
    },
    {
      id: 3,
      name: 'Strawberry Mango',
      color: 'red',
      priceUPB: 18000,
      priceExternal: 32000,
      available: 10,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729479521/ReserVapos/KuzStrawberryMango.png',
      puffs: 9000,
    },
    {
      id: 4,
      name: 'Strawberry Banana',
      color: 'pink',
      priceUPB: 18000,
      priceExternal: 32000,
      available: 10,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729479521/ReserVapos/KuzStrawberryBanana.png',
      puffs: 9000,
    },
    {
      id: 5,
      name: 'Rainbow Drop',
      color: 'blue',
      priceUPB: 18000,
      priceExternal: 32000,
      available: 10,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729479520/ReserVapos/KuzRaimbowDrop.png',
      puffs: 9000,
    },
    {
      id: 6,
      name: 'Mimosa',
      color: 'orange',
      priceUPB: 18000,
      priceExternal: 32000,
      available: 10,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729479520/ReserVapos/KuzMimosa.png',
      puffs: 9000,
    },
    {
      id: 7,
      name: 'Pineapple Coconut',
      color: 'yellow',
      priceUPB: 18000,
      priceExternal: 32000,
      available: 10,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729479520/ReserVapos/KuzPineappleCoco.png',
      puffs: 9000,
    },
    {
      id: 8,
      name: 'Miami Mint',
      color: 'teal',
      priceUPB: 18000,
      priceExternal: 32000,
      available: 10,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729479520/ReserVapos/KuzMiamiMint.png',
      puffs: 9000,
    },
    {
      id: 9,
      name: 'Mango Peach Watermelon',
      color: 'orange',
      priceUPB: 18000,
      priceExternal: 32000,
      available: 10,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729479520/ReserVapos/KuzMangoPeachWatermelon.png',
      puffs: 9000,
    },
    {
      id: 10,
      name: 'Mango Peach',
      color: 'yellow',
      priceUPB: 18000,
      priceExternal: 32000,
      available: 10,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729479520/ReserVapos/KuzMangoPeach.png',
      puffs: 9000,
    },
    {
      id: 11,
      name: 'Blue Razz Lemonade',
      color: 'blue',
      priceUPB: 18000,
      priceExternal: 32000,
      available: 10,
      image:
        'https://res.cloudinary.com/dflg46ddz/image/upload/v1729479520/ReserVapos/KuzBlueRazzLemonade.png',
      puffs: 9000,
    },
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@reservapos.com',
      password: 'admin123',
      isAdmin: true,
      isBanned: false,
      profilePicture: '/placeholder.svg?height=100&width=100',
      externalAddress: '',
      phoneNumber: '1234567890',
    },
    {
      id: 2,
      name: 'Regular User',
      email: 'user@example.com',
      password: 'user123',
      isAdmin: false,
      isBanned: false,
      profilePicture: '/placeholder.svg?height=100&width=100',
      externalAddress: '',
      phoneNumber: '9876543210',
    },
  ]);

  const [reservations, setReservations] = useState([]);
  const [warranties, setWarranties] = useState([]);
  const [passwordResetRequests, setPasswordResetRequests] = useState([]);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  useEffect(() => {
    let timeoutId;
    const handleInputBlur = (nextRef) => {
      timeoutId = setTimeout(() => {
        nextRef.current?.focus();
      }, 3000);
    };

    const clearInputTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    if (showRegisterDialog) {
      nameRef.current?.addEventListener('blur', () => handleInputBlur(emailRef));
      emailRef.current?.addEventListener('blur', () => handleInputBlur(passwordRef));
      passwordRef.current?.addEventListener('blur', () => handleInputBlur(phoneRef));

      return () => {
        clearInputTimeout();
        nameRef.current?.removeEventListener('blur', () => handleInputBlur(emailRef));
        emailRef.current?.removeEventListener('blur', () => handleInputBlur(passwordRef));
        passwordRef.current?.removeEventListener('blur', () => handleInputBlur(phoneRef));
      };
    }
  }, [showRegisterDialog]);

  useEffect(() => {
    document.documentElement.className = theme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      if (user.isBanned) {
        toast.error(t.accountBanned);
      } else {
        setCurrentUser(user);
        setShowLoginDialog(false);
        toast.success(`${t.welcome}, ${user.name}!`);
      }
    } else {
      toast.error(t.invalidCredentials);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword || !registerPhone) {
      toast.error('Please fill in all fields');
      return;
    }
    if (users.some((u) => u.email === registerEmail)) {
      toast.error('Email already registered');
    } else {
      const newUser = {
        id: users.length + 1,
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        phoneNumber: registerPhone,
        isAdmin: false,
        isBanned: false,
        profilePicture: '/placeholder.svg?height=100&width=100',
        externalAddress: '',
      };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      setShowRegisterDialog(false);
      toast.success(t.registrationSuccessful);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    toast.info(t.loggedOut);
  };

  const handleAddToCart = (vaporizer) => {
    if (currentUser) {
      if (!locationLocked) {
        setLocationLocked(true);
      }
      const existingItem = cart.find((item) => item.vaporizerId === vaporizer.id);
      const currentQuantity = existingItem ? existingItem.quantity : 0;
      if (currentQuantity + 1 > vaporizer.available) {
        toast.error(t.notEnoughStock);
        return;
      }

      const price = selectedLocation === 'UPB' ? vaporizer.priceUPB : vaporizer.priceExternal;
      const deliveryFee = selectedLocation === 'UPB' ? 0 : 3000;

      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.vaporizerId === vaporizer.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  total: (item.quantity + 1) * price + deliveryFee,
                }
              : item
          )
        );
      } else {
        const newItem = {
          id: Date.now(),
          vaporizerId: vaporizer.id,
          vaporizer: vaporizer.name,
          price: price,
          deliveryFee: deliveryFee,
          quantity: 1,
          total: price + deliveryFee,
          location: selectedLocation,
        };
        setCart([...cart, newItem]);
      }
      toast.success(`${vaporizer.name} ${t.itemAddedToCart}`);
    } else {
      setShowLoginDialog(true);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
    toast.info(t.itemRemovedFromCart);
  };

  const handleConfirmReservation = () => {
    if (selectedLocation === 'External' && !currentUser.externalAddress) {
      setShowAddressDialog(true);
      return;
    }

    setIsProcessingReservation(true);
    const newReservation = {
      id: Date.now() + Math.random(),
      userId: currentUser.id,
      items: cart.map((item) => ({
        ...item,
        status: 'Pending',
      })),
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setReservations([...reservations, newReservation]);
      setCart([]);
      setShowCart(false);
      setIsProcessingReservation(false);
      toast.success(t.reservationSubmitted);
      toast.warning(t.warrantyPeriod, {
        duration: 5000,
      });
    }, 1000);
  };

  const handleWarrantyClaim = (reservation, itemId) => {
    const existingWarranties = warranties.filter(
      (w) => w.reservationId === reservation.id && w.itemId === itemId
    );
    if (existingWarranties.length >= 2) {
      toast.error(t.maxWarrantyClaims);
      return;
    }
    const pendingWarranty = existingWarranties.find((w) => w.status === 'Pending');
    if (pendingWarranty) {
      toast.error(t.pendingWarrantyClaim);
      return;
    }
    const newWarranty = {
      id: warranties.length + 1,
      reservationId: reservation.id,
      itemId: itemId,
      userId: currentUser.id,
      status: 'Pending',
    };
    setWarranties([...warranties, newWarranty]);
    toast.success(t.warrantyClaimSubmitted);
  };

  const handleApproveReservationItem = (reservationId, itemId) => {
    setReservations(
      reservations.map((r) => {
        if (r.id === reservationId) {
          const updatedItems = r.items.map((item) => {
            if (item.id === itemId) {
              if (item.status !== 'Pending') {
                toast.error(t.alreadyProcessed);
                return item;
              }
              return { ...item, status: 'Approved' };
            }
            return item;
          });
          const allApproved = updatedItems.every((item) => item.status === 'Approved');
          const allProcessed = updatedItems.every((item) => item.status !== 'Pending');
          return {
            ...r,
            items: updatedItems,
            status: allApproved ? 'Approved' : allProcessed ? 'Partially Approved' : 'Pending',
          };
        }
        return r;
      })
    );

    const approvedItem = reservations
      .find((r) => r.id === reservationId)
      .items.find((item) => item.id === itemId);
    if (approvedItem.status === 'Pending') {
      setVaporizers(
        vaporizers.map((v) =>
          v.id === approvedItem.vaporizerId
            ? { ...v, available: v.available - approvedItem.quantity }
            : v
        )
      );
      toast.success(`${t.reservationApproved} #${reservationId} - Item #${itemId}`);
    }

    setSelectedOrder(reservations.find((r) => r.id === reservationId));
  };

  const handleCancelReservationItem = (reservationId, itemId) => {
    setReservations(
      reservations.map((r) => {
        if (r.id === reservationId) {
          const updatedItems = r.items.map((item) => {
            if (item.id === itemId) {
              if (item.status !== 'Pending') {
                toast.error(t.alreadyProcessed);
                return item;
              }
              return { ...item, status: 'Cancelled' };
            }
            return item;
          });
          const allCancelled = updatedItems.every((item) => item.status === 'Cancelled');
          const allProcessed = updatedItems.every((item) => item.status !== 'Pending');
          return {
            ...r,
            items: updatedItems,
            status: allCancelled ? 'Cancelled' : allProcessed ? 'Partially Cancelled' : 'Pending',
          };
        }
        return r;
      })
    );
    toast.info(`${t.reservationCancelled} #${reservationId} - Item #${itemId}`);

    setSelectedOrder(reservations.find((r) => r.id === reservationId));
  };

  const handleApproveWarranty = (warrantyId) => {
    const warranty = warranties.find((w) => w.id === warrantyId);
    setWarranties(warranties.map((w) => (w.id === warrantyId ? { ...w, status: 'Approved' } : w)));
    toast.success(`${t.warrantyClaimApproved} #${warrantyId}`);
    const user = users.find((u) => u.id === warranty.userId);
    if (user) {
      toast(`${t.warrantyClaimApproved} #${warrantyId}`, {
        duration: 5000,
        action: {
          label: t.viewDetails,
          onClick: () => {
            /* Navigate to warranty details */
          },
        },
      });
    }
  };

  const handleRejectWarranty = (warrantyId) => {
    const warranty = warranties.find((w) => w.id === warrantyId);
    setWarranties(warranties.map((w) => (w.id === warrantyId ? { ...w, status: 'Rejected' } : w)));
    toast.info(`${t.warrantyClaimRejected} #${warrantyId}`);
    const user = users.find((u) => u.id === warranty.userId);
    if (user) {
      toast(`${t.warrantyClaimRejected} #${warrantyId}`, {
        duration: 5000,
        action: {
          label: t.viewDetails,
          onClick: () => {
            /* Navigate to warranty details */
          },
        },
      });
    }
  };

  const handleAddVaporizer = (newVaporizer) => {
    setVaporizers([
      ...vaporizers,
      {
        id: vaporizers.length + 1,
        ...newVaporizer,
        available: parseInt(newVaporizer.available),
        priceUPB: parseInt(newVaporizer.priceUPB),
        priceExternal: parseInt(newVaporizer.priceExternal),
        puffs: 9000,
      },
    ]);
    toast.success(t.newVaporizerAdded);
  };

  const handleDeleteVaporizer = (vaporizerId) => {
    setVaporizers(vaporizers.filter((v) => v.id !== vaporizerId));
    toast.info(t.vaporizerRemoved);
  };

  const handleEditVaporizer = (vaporizerId, updatedVaporizer) => {
    setVaporizers(
      vaporizers.map((v) => (v.id === vaporizerId ? { ...v, ...updatedVaporizer } : v))
    );
    toast.success(`${t.vaporizerUpdated} #${vaporizerId}`);
  };

  const handleToggleUserBan = (userId, isBanned) => {
    if (userId === currentUser.id) {
      toast.error(t.cantBanYourself);
      return;
    }
    setUsers(users.map((u) => (u.id === userId ? { ...u, isBanned: isBanned } : u)));
    toast.info(`${t.users} #${userId} ${isBanned ? t.userBanned : t.userUnbanned}`);
  };

  const handleCreateUser = () => {
    const newUser = {
      id: users.length + 1,
      name: 'New User',
      email: `user${users.length + 1}@example.com`,
      password: 'password123',
      isAdmin: false,
      isBanned: false,
      profilePicture: '/placeholder.svg?height=100&width=100',
      externalAddress: '',
      phoneNumber: '',
    };
    setUsers([...users, newUser]);
    toast.success(t.newUserCreated);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setTempProfile((prevProfile) => ({ ...prevProfile, ...updatedProfile }));
  };

  const handleViewUserProfile = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setViewingUser(user);
      setShowProfileDialog(true);
    }
  };

  const handlePasswordResetRequest = (email) => {
    const user = users.find((u) => u.email === email);
    if (user) {
      const request = {
        id: passwordResetRequests.length + 1,
        userId: user.id,
        status: 'Pending',
      };
      setPasswordResetRequests([...passwordResetRequests, request]);
      toast.success(t.passwordResetRequested);
    } else {
      toast.error(t.userNotFound);
    }
  };

  const handleApprovePasswordReset = (requestId) => {
    const request = passwordResetRequests.find((r) => r.id === requestId);
    const user = users.find((u) => u.id === request.userId);
    const newPassword = Math.random().toString(36).slice(-8);
    setUsers(users.map((u) => (u.id === user.id ? { ...u, password: newPassword } : u)));
    setPasswordResetRequests(
      passwordResetRequests.map((r) => (r.id === requestId ? { ...r, status: 'Approved' } : r))
    );
    toast.success(`${t.passwordReset} ${user.email}. ${t.newPassword} ${newPassword}`);
  };

  const handleSaveAddress = () => {
    if (
      !newAddress.department ||
      !newAddress.city ||
      !newAddress.neighborhood ||
      !newAddress.streetType ||
      !newAddress.streetNumber ||
      !newAddress.houseNumber
    ) {
      toast.error(t.addressRequired);
      return;
    }
    const formattedAddress = `${newAddress.streetType} ${newAddress.streetNumber} #${newAddress.houseNumber}, ${newAddress.neighborhood}, ${newAddress.city}, ${newAddress.department}`;
    const updatedAddress = { ...newAddress, formattedAddress };
    setCurrentUser({ ...currentUser, externalAddress: JSON.stringify(updatedAddress) });
    setShowAddressDialog(false);
  };

  const pendingReservations = reservations.filter(
    (r) => r.status === 'Pending' && r.userId === currentUser?.id
  ).length;
  const pendingWarranties = warranties.filter(
    (w) => w.status === 'Pending' && w.userId === currentUser?.id
  ).length;

  const handleOpenProfileDialog = () => {
    setViewingUser(null);
    setTempProfile(currentUser ? { ...currentUser } : null);
    setShowProfileDialog(true);
  };

  if (showAgeVerificationFailure) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Image
          src="/placeholder.svg?height=200&width=200"
          alt="ReserVapos Logo"
          width={200}
          height={200}
        />
        <h1 className="text-2xl font-bold mt-4 mb-2">{t.ageVerificationFailed}</h1>
        <p className="text-gray-600">{t.ageVerificationFailedMessage}</p>
      </div>
    );
  }

  const departmentOptions = ['Antioquia'];
  const cityOptions = ['Medellín'];
  const neighborhoodOptions = [
    'El Poblado',
    'Laureles',
    'Envigado',
    'Belén',
    'La América',
    'Robledo',
    'Aranjuez',
    'Manrique',
    'Buenos Aires',
    'La Candelaria',
  ];
  const streetTypeOptions = ['Calle', 'Carrera', 'Avenida', 'Circular', 'Diagonal', 'Transversal'];
  const propertyTypeOptions = ['Casa', 'Apartamento', 'Oficina', 'Local'];

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 ${montserrat.className}`}>
      <Toaster />
      <AlertDialog
        open={showAgeVerification}
        onOpenChange={setShowAgeVerification}
        className="dark:text-gray-100"
      >
        <AlertDialogContent className="dark:text-gray-100">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.ageVerification}</AlertDialogTitle>
            <AlertDialogDescription>{t.ageQuestion}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setShowAgeVerification(false);
                setShowAgeVerificationFailure(true);
              }}
            >
              {t.no}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowAgeVerification(false);
                setShowDisclaimer(true);
              }}
            >
              {t.yes}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showDisclaimer}
        onOpenChange={setShowDisclaimer}
        className="dark:text-gray-100"
      >
        <AlertDialogContent className="dark:text-gray-100">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.disclaimer}</AlertDialogTitle>
            <AlertDialogDescription>{t.disclaimerText}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowDisclaimer(false)}>
              {t.understand}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        className="dark:text-gray-100"
      >
        <DialogContent className="dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>{t.login}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  {t.email}
                </Label>
                <Input
                  id="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  {t.password}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{t.login}</Button>
              <Button variant="link" onClick={() => setShowPasswordResetDialog(true)}>
                {t.forgotPassword}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showRegisterDialog}
        onOpenChange={setShowRegisterDialog}
        className="dark:text-gray-100"
      >
        <DialogContent className="dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>{t.register}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegister}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {t.name}
                </Label>
                <Input
                  id="name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="col-span-3"
                  ref={nameRef}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  {t.email}
                </Label>
                <Input
                  id="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="col-span-3"
                  ref={emailRef}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  {t.password}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="col-span-3"
                  ref={passwordRef}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  {t.phoneNumber}
                </Label>
                <Input
                  id="phone"
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  className="col-span-3"
                  ref={phoneRef}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{t.register}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        className="dark:text-gray-100"
      >
        <DialogContent className="sm:max-w-[425px] dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>{t.profile}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUsers(users.map((u) => (u.id === currentUser.id ? { ...u, ...tempProfile } : u)));
              setCurrentUser({ ...currentUser, ...tempProfile });
              setTempProfile(null);
              toast.success(t.profileUpdated);
              setShowProfileDialog(false);
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Image
                  src={
                    viewingUser?.profilePicture ||
                    tempProfile?.profilePicture ||
                    currentUser?.profilePicture ||
                    '/placeholder.svg?height=100&width=100'
                  }
                  alt="Profile picture"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                {!viewingUser && (
                  <Input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleUpdateProfile({ profilePicture: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {t.name}
                </Label>
                <Input
                  id="name"
                  value={tempProfile?.name || currentUser?.name || ''}
                  onChange={(e) => handleUpdateProfile({ name: e.target.value })}
                  className="col-span-3"
                  readOnly={!!viewingUser}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  {t.email}
                </Label>
                <Input
                  id="email"
                  value={tempProfile?.email || currentUser?.email || ''}
                  onChange={(e) => handleUpdateProfile({ email: e.target.value })}
                  className="col-span-3"
                  readOnly={!!viewingUser}
                />
              </div>
              {!viewingUser && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    {t.password}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={tempProfile?.password || ''}
                    onChange={(e) => handleUpdateProfile({ password: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="externalAddress" className="text-right">
                  External Address
                </Label>
                <div className="col-span-3 flex items-center justify-between">
                  <p className="text-sm">
                    {tempProfile?.externalAddress
                      ? JSON.parse(tempProfile.externalAddress).formattedAddress
                      : 'No address set'}
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setShowAddressDialog(true)}>
                    Update Address
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  {t.phoneNumber}
                </Label>
                <Input
                  id="phoneNumber"
                  value={tempProfile?.phoneNumber || currentUser?.phoneNumber || ''}
                  onChange={(e) => handleUpdateProfile({ phoneNumber: e.target.value })}
                  className="col-span-3"
                  readOnly={!!viewingUser}
                />
              </div>
            </div>
            <DialogFooter>
              {!viewingUser && <Button type="submit">{t.save}</Button>}
              {viewingUser && (
                <Button onClick={() => setShowProfileDialog(false)}>{t.close}</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showPasswordResetDialog}
        onOpenChange={setShowPasswordResetDialog}
        className="dark:text-gray-100"
      >
        <DialogContent className="dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>{t.resetPassword}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordResetRequest(e.target.email.value);
              setShowPasswordResetDialog(false);
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  {t.email}
                </Label>
                <Input id="email" name="email" type="email" required className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{t.resetPassword}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showCart} onOpenChange={setShowCart} className="dark:text-gray-100">
        <DialogContent className="dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>{t.cart}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>
                  {item.vaporizer} (x{item.quantity})
                </span>
                <span>${item.total}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  {t.remove}
                </Button>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              onClick={handleConfirmReservation}
              disabled={cart.length === 0 || isProcessingReservation}
            >
              {isProcessingReservation ? t.processing : t.confirmReservation}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
        className="dark:text-gray-100"
      >
        <DialogContent className="dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>{t.contactUs}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>For any inquiries, please contact us at:</p>
            <p>Email: contact@reservapos.com</p>
            <p>Phone: +1 234 567 8900</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showTermsDialog}
        onOpenChange={setShowTermsDialog}
        className="dark:text-gray-100"
      >
        <DialogContent className="max-w-4xl dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>{t.termsAndConditions}</DialogTitle>
          </DialogHeader>
          <div
            className="py-4 max-h-[60vh] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: t.termsContent }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={showAddressDialog}
        onOpenChange={setShowAddressDialog}
        className="dark:text-gray-100"
      >
        <DialogContent className="sm:max-w-[425px] dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>{t.addressDetails}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                {t.department}
              </Label>
              <Select
                value={newAddress.department}
                onValueChange={(value) => setNewAddress({ ...newAddress, department: value })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {departmentOptions.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                {t.city}
              </Label>
              <Select
                value={newAddress.city}
                onValueChange={(value) => setNewAddress({ ...newAddress, city: value })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {cityOptions.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="neighborhood" className="text-right">
                {t.neighborhood}
              </Label>
              <Select
                value={newAddress.neighborhood}
                onValueChange={(value) => setNewAddress({ ...newAddress, neighborhood: value })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {neighborhoodOptions.map((neighborhood) => (
                    <SelectItem key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                {t.address}
              </Label>
              <Select
                value={newAddress.streetType}
                onValueChange={(value) => setNewAddress({ ...newAddress, streetType: value })}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {streetTypeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="streetNumber"
                value={newAddress.streetNumber}
                onChange={(e) => setNewAddress({ ...newAddress, streetNumber: e.target.value })}
                className="w-[60px]"
              />
              <Input
                id="houseNumber"
                value={newAddress.houseNumber}
                onChange={(e) => setNewAddress({ ...newAddress, houseNumber: e.target.value })}
                className="w-[60px]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="propertyType" className="text-right">
                {t.propertyType}
              </Label>
              <Select
                value={newAddress.propertyType}
                onValueChange={(value) => setNewAddress({ ...newAddress, propertyType: value })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="blockOrInterior" className="text-right">
                {t.blockOrInterior}
              </Label>
              <Input
                id="blockOrInterior"
                value={newAddress.blockOrInterior}
                onChange={(e) => setNewAddress({ ...newAddress, blockOrInterior: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deliveryInstructions" className="text-right">
                {t.deliveryInstructions}
              </Label>
              <Textarea
                id="deliveryInstructions"
                value={newAddress.deliveryInstructions}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, deliveryInstructions: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveAddress}>{t.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-primary font-sans">{t.title}</h1>
          <div className="hidden md:flex items-center space-x-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            {!currentUser ? (
              <div>
                <Button onClick={() => setShowLoginDialog(true)} variant="ghost" className="mr-2">
                  {t.login}
                </Button>
                <Button onClick={() => setShowRegisterDialog(true)}>{t.register}</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Image
                    src={currentUser.profilePicture || '/placeholder.svg?height=32&width=32'}
                    alt="Profile picture"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-primary">
                    {t.welcome}, {currentUser.name}!
                  </span>
                </div>
                <Button onClick={handleOpenProfileDialog} variant="outline">
                  <User className="h-5 w-5 mr-2" />
                  {t.profile}
                </Button>
                <Button onClick={handleLogout} variant="outline">
                  {t.logout}
                </Button>
                <Button onClick={() => setShowCart(true)} variant="outline" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 py-2">
            {!currentUser ? (
              <div className="flex flex-col items-center space-y-2">
                <Button onClick={() => setShowLoginDialog(true)} variant="ghost" className="w-full">
                  {t.login}
                </Button>
                <Button onClick={() => setShowRegisterDialog(true)} className="w-full">
                  {t.register}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <span className="text-primary">
                  {t.welcome}, {currentUser.name}!
                </span>
                <Button onClick={handleOpenProfileDialog} variant="outline" className="w-full">
                  <User className="h-5 w-5 mr-2" />
                  {t.profile}
                </Button>
                <Button onClick={handleLogout} variant="outline" className="w-full">
                  {t.logout}
                </Button>
                <Button
                  onClick={() => setShowCart(true)}
                  variant="outline"
                  className="w-full relative"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {t.cart}
                  {cart.length > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
                    >
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </header>

      <div className="container-fluid mx-auto my-8 px-4">
        <div className="w-screen overflow-hidden">
          <Carousel className="w-full" style={{ userSelect: 'none', touchAction: 'none' }}>
            <CarouselContent>
              <AnimatePresence initial={false}>
                {carouselItems.map((item, index) => (
                  <CarouselItem
                    key={item.id}
                    className={index === currentSlide ? 'block' : 'hidden'}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="border-none rounded-none">
                        <CardContent className="p-0">
                          <div className="relative w-full aspect-[16/9] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <div className="relative w-full max-w-6xl aspect-[16/9]">
                              <Image
                                src={item.image}
                                alt={`Slide ${item.id}`}
                                fill
                                className="object-contain mx-auto"
                                sizes="100vw"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </AnimatePresence>
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <main className="container mx-auto p-4">
        <Tabs
          defaultValue="catalog"
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger
              value="catalog"
              className={`bg-gray-200 text-gray-800 hover:bg-gray-300 ${
                activeTab === 'catalog' ? 'bg-primary text-primary-foreground' : 'bg-opacity-50'
              }`}
            >
              {t.catalog}
            </TabsTrigger>
            {currentUser && (
              <TabsTrigger
                value="reservations"
                className={`bg-gray-200 text-gray-800 hover:bg-gray-300 ${
                  activeTab === 'reservations'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-opacity-50'
                }`}
              >
                {t.myOrders}
                {pendingReservations > 0 && (
                  <Badge variant="warning" className="ml-2">
                    {pendingReservations}
                  </Badge>
                )}
              </TabsTrigger>
            )}
            {currentUser && currentUser.isAdmin && (
              <TabsTrigger
                value="admin"
                className={`bg-gray-200 text-gray-800 hover:bg-gray-300 ${
                  activeTab === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-opacity-50'
                }`}
              >
                {t.admin}
                {(pendingReservations > 0 || pendingWarranties > 0) && (
                  <Badge variant="warning" className="ml-2">
                    {pendingReservations + pendingWarranties}
                  </Badge>
                )}
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="catalog">
            <div className="mb-6">
              <Label htmlFor="location" className="text-lg font-semibold mb-2 block">
                {t.selectLocation}
              </Label>
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
                disabled={locationLocked}
              >
                <SelectTrigger id="location" className="w-full max-w-xs">
                  <SelectValue placeholder={t.selectLocation} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPB">UPB</SelectItem>
                  <SelectItem value="External">External</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {vaporizers.map((vaporizer) => (
                <Card
                  key={vaporizer.id}
                  className={`overflow-hidden transition-all duration-300 hover:shadow-lg bg-${vaporizer.color}-100 flex flex-col dark:bg-gray-700`}
                >
                  <CardHeader className="p-0">
                    <div className="aspect-square relative">
                      <Image
                        src={vaporizer.image}
                        alt={vaporizer.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2 dark:text-gray-800">
                        {vaporizer.name}
                      </CardTitle>
                      <CardDescription className="dark:text-gray-600">
                        <Badge
                          variant={vaporizer.available > 0 ? 'secondary' : 'outline'}
                          className="mb-2"
                        >
                          {vaporizer.available > 0
                            ? `${vaporizer.available} ${t.available}`
                            : t.outOfStock}
                        </Badge>
                        <p className="text-lg font-semibold">
                          {t.price}: $
                          {selectedLocation === 'UPB'
                            ? vaporizer.priceUPB
                            : vaporizer.priceExternal}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t.puffs}: {vaporizer.puffs}
                        </p>
                        {selectedLocation === 'External' && (
                          <p className="text-sm text-muted-foreground">Delivery Fee: $3000</p>
                        )}
                      </CardDescription>
                    </div>
                    {currentUser && (
                      <div className="mt-4">
                        <Button
                          onClick={() => handleAddToCart(vaporizer)}
                          className="w-full"
                          disabled={vaporizer.available === 0}
                        >
                          {vaporizer.available > 0 ? t.addToCart : t.outOfStock}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {currentUser && (
            <TabsContent value="reservations">
              <Card>
                <CardHeader>
                  <CardTitle>{t.myOrders}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>{t.orderStatus}</TableHead>
                        <TableHead>{t.orderDate}</TableHead>
                        <TableHead>{t.total}</TableHead>
                        <TableHead>{t.actions}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reservations
                        .filter((r) => r.userId === currentUser.id)
                        .map((reservation) => (
                          <TableRow key={reservation.id}>
                            <TableCell>{reservation.id}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  reservation.status === 'Approved'
                                    ? 'success'
                                    : reservation.status === 'Pending'
                                    ? 'warning'
                                    : 'destructive'
                                }
                              >
                                {reservation.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(reservation.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              ${reservation.items.reduce((total, item) => total + item.total, 0)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedOrder(reservation);
                                  setShowOrderDetails(true);
                                }}
                              >
                                {t.viewDetails}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Dialog
                open={showOrderDetails}
                onOpenChange={setShowOrderDetails}
                className="dark:text-gray-100"
              >
                <DialogContent className="dark:text-gray-100">
                  <DialogHeader>
                    <DialogTitle>{t.viewDetails}</DialogTitle>
                  </DialogHeader>
                  {selectedOrder && (
                    <div>
                      <p>
                        {t.orderStatus}: {selectedOrder.status}
                      </p>
                      <p>
                        {t.orderDate}: {new Date(selectedOrder.createdAt).toLocaleString()}
                      </p>
                      <h3 className="font-bold mt-4 mb-2">Items:</h3>
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="mb-2">
                          <p>
                            {item.vaporizer} - ${item.price} x {item.quantity}
                          </p>
                          <p>Location: {item.location}</p>
                          {item.deliveryFee > 0 && <p>Delivery Fee: ${item.deliveryFee}</p>}
                          <p>Status: {item.status}</p>
                          {item.status === 'Approved' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleWarrantyClaim(selectedOrder, item.id)}
                              disabled={
                                warranties.filter(
                                  (w) =>
                                    w.reservationId === selectedOrder.id && w.itemId === item.id
                                ).length >= 2
                              }
                              className="mt-2"
                            >
                              Claim Warranty
                            </Button>
                          )}
                        </div>
                      ))}
                      <p className="font-bold mt-4">
                        {t.total}: $
                        {selectedOrder.items.reduce((total, item) => total + item.total, 0)}
                      </p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </TabsContent>
          )}

          {currentUser && currentUser.isAdmin && (
            <TabsContent value="admin">
              <Tabs defaultValue="reservations">
                <TabsList className="mb-4">
                  <TabsTrigger value="reservations" className="relative">
                    {t.myOrders}
                    {pendingReservations > 0 && (
                      <Badge variant="warning" className="ml-2">
                        {pendingReservations}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="warranties" className="relative">
                    Warranties
                    {pendingWarranties > 0 && (
                      <Badge variant="warning" className="ml-2">
                        {pendingWarranties}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="inventory">{t.inventory}</TabsTrigger>
                  <TabsTrigger value="users">{t.users}</TabsTrigger>
                  <TabsTrigger value="passwordResets">{t.passwordResets}</TabsTrigger>
                </TabsList>

                <TabsContent value="reservations">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.myOrders}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>{t.users}</TableHead>
                            <TableHead>{t.orderStatus}</TableHead>
                            <TableHead>{t.total}</TableHead>
                            <TableHead>{t.orderDate}</TableHead>
                            <TableHead>{t.actions}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reservations.map((reservation) => (
                            <TableRow key={reservation.id}>
                              <TableCell>{reservation.id}</TableCell>
                              <TableCell>
                                {users.find((u) => u.id === reservation.userId)?.name}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    reservation.status === 'Approved'
                                      ? 'success'
                                      : reservation.status === 'Pending'
                                      ? 'warning'
                                      : 'destructive'
                                  }
                                >
                                  {reservation.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                ${reservation.items.reduce((total, item) => total + item.total, 0)}
                              </TableCell>
                              <TableCell>
                                {new Date(reservation.createdAt).toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedOrder(reservation);
                                    setShowOrderDetails(true);
                                  }}
                                >
                                  {t.viewDetails}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Dialog
                    open={showOrderDetails}
                    onOpenChange={setShowOrderDetails}
                    className="dark:text-gray-100"
                  >
                    <DialogContent className="max-w-3xl dark:text-gray-100">
                      <DialogHeader>
                        <DialogTitle>{t.viewDetails}</DialogTitle>
                      </DialogHeader>
                      {selectedOrder && (
                        <div>
                          <p>
                            {t.orderStatus}: {selectedOrder.status}
                          </p>
                          <p>
                            {t.orderDate}: {new Date(selectedOrder.createdAt).toLocaleString()}
                          </p>
                          <h3 className="font-bold mt-4 mb-2">Items:</h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {selectedOrder.items.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.vaporizer}</TableCell>
                                  <TableCell>${item.price}</TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>${item.total}</TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={
                                        item.status === 'Approved'
                                          ? 'success'
                                          : item.status === 'Pending'
                                          ? 'warning'
                                          : 'destructive'
                                      }
                                    >
                                      {item.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    {item.status === 'Pending' && (
                                      <div className="flex space-x-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                            handleApproveReservationItem(selectedOrder.id, item.id)
                                          }
                                        >
                                          {t.approve}
                                        </Button>
                                        <Button
                                          variant="destructive"
                                          size="sm"
                                          onClick={() =>
                                            handleCancelReservationItem(selectedOrder.id, item.id)
                                          }
                                        >
                                          {t.reject}
                                        </Button>
                                      </div>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <p className="font-bold mt-4">
                            {t.total}: $
                            {selectedOrder.items.reduce((total, item) => total + item.total, 0)}
                          </p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TabsContent>

                <TabsContent value="warranties">
                  <Card>
                    <CardHeader>
                      <CardTitle>Warranties</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>{t.users}</TableHead>
                            <TableHead>Reservation ID</TableHead>
                            <TableHead>Item ID</TableHead>
                            <TableHead>{t.orderStatus}</TableHead>
                            <TableHead>{t.actions}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {warranties.map((warranty) => (
                            <TableRow key={warranty.id}>
                              <TableCell>{warranty.id}</TableCell>
                              <TableCell>
                                {users.find((u) => u.id === warranty.userId)?.name}
                              </TableCell>
                              <TableCell>{warranty.reservationId}</TableCell>
                              <TableCell>{warranty.itemId}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    warranty.status === 'Approved'
                                      ? 'success'
                                      : warranty.status === 'Pending'
                                      ? 'warning'
                                      : 'destructive'
                                  }
                                >
                                  {warranty.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {warranty.status === 'Pending' && (
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleApproveWarranty(warranty.id)}
                                    >
                                      {t.approve}
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleRejectWarranty(warranty.id)}
                                    >
                                      {t.reject}
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="inventory">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.inventory}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>{t.name}</TableHead>
                            <TableHead>{t.color}</TableHead>
                            <TableHead>{t.priceUPB}</TableHead>
                            <TableHead>{t.priceExternal}</TableHead>
                            <TableHead>{t.available}</TableHead>
                            <TableHead>{t.puffs}</TableHead>
                            <TableHead>{t.image}</TableHead>
                            <TableHead>{t.actions}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {vaporizers.map((vaporizer) => (
                            <TableRow key={vaporizer.id}>
                              <TableCell>{vaporizer.id}</TableCell>
                              <TableCell>
                                <Input
                                  value={vaporizer.name}
                                  onChange={(e) =>
                                    handleEditVaporizer(vaporizer.id, { name: e.target.value })
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={vaporizer.color}
                                  onChange={(e) =>
                                    handleEditVaporizer(vaporizer.id, { color: e.target.value })
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={vaporizer.priceUPB}
                                  onChange={(e) =>
                                    handleEditVaporizer(vaporizer.id, {
                                      priceUPB: parseInt(e.target.value),
                                    })
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={vaporizer.priceExternal}
                                  onChange={(e) =>
                                    handleEditVaporizer(vaporizer.id, {
                                      priceExternal: parseInt(e.target.value),
                                    })
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={vaporizer.available}
                                  onChange={(e) =>
                                    handleEditVaporizer(vaporizer.id, {
                                      available: parseInt(e.target.value),
                                    })
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={vaporizer.puffs}
                                  onChange={(e) =>
                                    handleEditVaporizer(vaporizer.id, {
                                      puffs: parseInt(e.target.value),
                                    })
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        handleEditVaporizer(vaporizer.id, { image: reader.result });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteVaporizer(vaporizer.id)}
                                >
                                  {t.remove}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Dialog className="dark:text-gray-100">
                        <DialogTrigger asChild>
                          <Button className="mt-4">{t.addNewVaporizer}</Button>
                        </DialogTrigger>
                        <DialogContent className="dark:text-gray-100">
                          <DialogHeader>
                            <DialogTitle>{t.addNewVaporizer}</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.target as HTMLFormElement);
                              const newVaporizer = Object.fromEntries(formData.entries());
                              handleAddVaporizer(newVaporizer);
                              (e.target as HTMLFormElement).reset();
                            }}
                          >
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  {t.name}
                                </Label>
                                <Input id="name" name="name" className="col-span-3" required />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="color" className="text-right">
                                  {t.color}
                                </Label>
                                <Input id="color" name="color" className="col-span-3" required />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="priceUPB" className="text-right">
                                  {t.priceUPB}
                                </Label>
                                <Input
                                  id="priceUPB"
                                  name="priceUPB"
                                  type="number"
                                  className="col-span-3"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="priceExternal" className="text-right">
                                  {t.priceExternal}
                                </Label>
                                <Input
                                  id="priceExternal"
                                  name="priceExternal"
                                  type="number"
                                  className="col-span-3"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="available" className="text-right">
                                  {t.available}
                                </Label>
                                <Input
                                  id="available"
                                  name="available"
                                  type="number"
                                  className="col-span-3"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="puffs" className="text-right">
                                  {t.puffs}
                                </Label>
                                <Input
                                  id="puffs"
                                  name="puffs"
                                  type="number"
                                  className="col-span-3"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="image" className="text-right">
                                  {t.image}
                                </Label>
                                <Input
                                  id="image"
                                  name="image"
                                  type="file"
                                  accept="image/*"
                                  className="col-span-3"
                                  required
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">{t.addNewVaporizer}</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="users">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.users}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>{t.name}</TableHead>
                            <TableHead>{t.email}</TableHead>
                            <TableHead>{t.admin}</TableHead>
                            <TableHead>{t.orderStatus}</TableHead>
                            <TableHead>{t.actions}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>{user.id}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.isAdmin ? t.yes : t.no}</TableCell>
                              <TableCell>
                                <Badge variant={user.isBanned ? 'destructive' : 'success'}>
                                  {user.isBanned ? 'Banned' : 'Active'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  {user.isBanned ? (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleToggleUserBan(user.id, false)}
                                    >
                                      {t.unban}
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleToggleUserBan(user.id, true)}
                                    >
                                      {t.ban}
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewUserProfile(user.id)}
                                  >
                                    {t.viewDetails}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Button className="mt-4" onClick={handleCreateUser}>
                        {t.createNewUser}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="passwordResets">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.passwordResets}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>{t.users}</TableHead>
                            <TableHead>{t.orderStatus}</TableHead>
                            <TableHead>{t.actions}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {passwordResetRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>{request.id}</TableCell>
                              <TableCell>
                                {users.find((u) => u.id === request.userId)?.email}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={request.status === 'Pending' ? 'warning' : 'success'}
                                >
                                  {request.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {request.status === 'Pending' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleApprovePasswordReset(request.id)}
                                  >
                                    {t.resetPassword}
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          )}
        </Tabs>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-primary">{t.title}</h3>
              <p className="text-sm text-muted-foreground">
                © 2023 {t.title}. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button variant="link" onClick={() => setShowTermsDialog(true)}>
              {t.termsAndConditions}
            </Button>
          </div>
        </div>
      </footer>

      <Button
        className="fixed bottom-4 right-4 rounded-full p-4"
        onClick={() => setShowContactDialog(true)}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">{t.contactUs}</span>
      </Button>

      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-800 p-4 shadow-md">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0 md:mr-4">{t.cookieConsent}</p>
            <div className="flex space-x-4">
              <Button onClick={() => setShowCookieConsent(false)}>{t.acceptCookies}</Button>
              <Button variant="outline" onClick={() => setShowCookieConsent(false)}>
                {t.rejectCookies}
              </Button>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        .dark {
          --background: 222.2 84% 4.9%;
          --foreground: 210 40% 98%;
        }
        .dark .bg-white {
          background-color: hsl(var(--background));
          color: hsl(var(--foreground));
        }
        .dark .text-gray-800 {
          color: hsl(var(--foreground));
        }
        .dark .bg-gray-100 {
          background-color: hsl(var(--background));
        }
        .dark .text-primary {
          color: hsl(var(--foreground));
        }
        .dark .Dialog,
        .dark .AlertDialog {
          color: hsl(var(--foreground));
        }
        .dark .Card {
          background-color: hsl(var(--background));
        }
        .dark .Card .CardTitle,
        .dark .Card .CardDescription {
          color: hsl(222.2 47.4% 11.2%);
        }
      `}</style>
    </div>
  );
}

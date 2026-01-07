import { useState, useEffect } from 'react';
import { LogIn, Home, BookText, Users, BookA, BrainCircuit, UserCircle, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from './ui/dropdown-menu';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from "@/stores/useAuthStore";

const navItems = [
    { label: 'Trang chủ', href: '#', icon: Home },
    { label: 'Khóa học', href: '/courses', icon: BookText },
    { label: 'Lớp học', href: '#classes', icon: Users },
    { label: 'AI Interview', href: '#ai-interview', icon: BrainCircuit },
    { label: 'Bảng chữ cái', href: '#character', icon: BookA },
];

export function Header() {
    const [activeNav, setActiveNav] = useState('#');
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const { loginUser, logout } = useAuthStore();
    const navigate = useNavigate();

    const isLoggedIn = !!loginUser;

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        logout();
    };

    const getUserName = () => {
        if (!loginUser) return "";
        return `${loginUser.firstName} ${loginUser.lastName}`.trim();
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 10) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <header
                className={`
                    top-0 z-50 w-full shadow-md bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80
                    
                    /* --- MOBILE STYLES (Mặc định) --- */
                    fixed transition-transform duration-300
                    ${isVisible ? 'translate-y-0' : '-translate-y-full'}

                    /* --- DESKTOP STYLES (md trở lên) --- */
                    md:sticky md:translate-y-0 md:transition-none
                `}
            >
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/logo-v2.png"
                            alt="Fapanese Logo"
                            className="h-10 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:items-center md:gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-md font-medium text-gray-700 transition-colors hover:text-blue-300"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Auth Section */}
                    <div className="flex items-center gap-3">
                        {isLoggedIn ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 md:gap-3 rounded-full hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        <Avatar className="h-8 w-8 md:h-9 md:w-9">
                                            <AvatarImage src={loginUser?.avtUrl ?? undefined} alt={loginUser?.firstName} />
                                            <AvatarFallback>{loginUser?.firstName?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="hidden md:inline-block text-sm font-medium">
                                            {getUserName()}
                                        </span>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium">{getUserName()}</p>
                                            <p className="text-xs text-gray-500">{loginUser?.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <UserCircle className="mr-2 h-4 w-4" />
                                        <span>Trang cá nhân</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <BookText className="mr-2 h-4 w-4" />
                                        <span>Khóa học của tôi</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Cài đặt</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        variant="destructive"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Đăng xuất</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button onClick={handleLogin} className="md:flex gap-2">
                                <LogIn className="h-4 w-4" />
                                Đăng nhập
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* --- SPACER DIV --- */}
            {/* Div này có chiều cao bằng header (h-16) để đẩy nội dung xuống */}
            {/* Chỉ hiện ở mobile (md:hidden) vì desktop dùng sticky đã tự chiếm chỗ rồi */}
            <div className="h-16 md:hidden" />

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden shadow-[0_-5px_10px_rgba(0,0,0,0.05)] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/100 pb-safe rounded-t-2xl overflow-hidden">
                <div className="flex items-center justify-around h-12 px-2">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setActiveNav(item.href)}
                            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${activeNav === item.href
                                ? 'text-blue-300'
                                : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            <item.icon className={`h-6 w-6 ${activeNav === item.href ? 'stroke-[2.5]' : ''}`} />
                        </a>
                    ))}
                </div>
            </nav>
        </>
    );
}
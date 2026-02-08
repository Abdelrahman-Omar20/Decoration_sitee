import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button 
            onClick={toggleLanguage} 
            className="language-switcher"
            aria-label="Switch Language"
        >
            <Globe size={20} />
            <span className="lang-text">
                {i18n.language === 'en' ? 'العربية' : 'English'}
            </span>
        </button>
    );
}

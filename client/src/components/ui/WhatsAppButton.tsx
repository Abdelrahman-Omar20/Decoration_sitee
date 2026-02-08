import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

interface WhatsAppButtonProps {
    phoneNumber: string;
    message?: string;
}

export default function WhatsAppButton({ phoneNumber, message = "Hello! I'm interested in your decoration services." }: WhatsAppButtonProps) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={28} />
        </a>
    );
}

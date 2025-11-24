// src/hooks/useNotifications.ts
import { useState, useCallback, useRef } from 'react';

export interface Notification {
  id: number;
  message: string;
  type: 'new_report' | 'status_change' | 'comment';
  timestamp: Date;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const previousCountRef = useRef<number>(0);

  const checkNewReports = useCallback((currentCount: number) => {
    console.log('Verificando reportes:', { 
      anterior: previousCountRef.current, 
      actual: currentCount 
    });

    if (currentCount > previousCountRef.current) {
      const diff = currentCount - previousCountRef.current;
      
      const notification: Notification = {
        id: Date.now(),
        message: `${diff} nuevo${diff > 1 ? 's' : ''} reporte${diff > 1 ? 's' : ''} sin atender`,
        type: 'new_report',
        timestamp: new Date(),
      };

      console.log('Creando notificación:', notification);
      
      setNotifications(prev => [...prev, notification]);

      setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);
    }

    previousCountRef.current = currentCount;
  }, []);

  const removeNotification = useCallback((id: number) => {
    console.log('Eliminando notificación:', id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    console.log('Limpiando todas las notificaciones');
    setNotifications([]);
  }, []);

  return {
    notifications,
    checkNewReports,
    removeNotification,
    clearAllNotifications,
  };
};
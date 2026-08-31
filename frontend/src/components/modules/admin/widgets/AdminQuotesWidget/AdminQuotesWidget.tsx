'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, Trash2, Edit, Check } from '@/components/UI';
import styles from './AdminQuotesWidget.module.css';
import { quotesService, Quote } from '@/services/quotes.service';

export const AdminQuotesWidget: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    quotesService.getQuotes().then((data) => {
      if (isMounted) setQuotes(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const resetForm = () => {
    setText('');
    setEditingId(null);
  };

  const handleStartEdit = (item: Quote) => {
    setEditingId(item.id);
    setText(item.text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      if (editingId) {
        await quotesService.updateQuote(editingId, { text: text.trim() });
      } else {
        await quotesService.createQuote({ text: text.trim() });
      }

      resetForm();
      const updated = await quotesService.getQuotes();
      setQuotes(updated);
    } catch {
      alert('Помилка при збереженні цитати');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Видалити цю цитату?')) return;
    try {
      await quotesService.deleteQuote(id);
      if (editingId === id) resetForm();
      const updated = await quotesService.getQuotes();
      setQuotes(updated);
    } catch {
      alert('Помилка видалення');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MessageSquare size={22} className={styles.headerIcon} />
        <span>Керування цитатами 💬</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        <div className={styles.formTitle}>
          <span>{editingId ? 'Редагування цитати ✏️' : 'Додати нову цитату ✨'}</span>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Текст цитати / компліменту</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Наприклад: Твоя посмішка — моє улюблене сонце ☀️"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <div className={styles.buttonRow}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {editingId ? <Check size={18} /> : <Plus size={18} />}
            <span>
              {isSubmitting
                ? 'Збереження...'
                : editingId
                ? 'Збережити зміни'
                : 'Додати цитату'}
            </span>
          </button>

          {editingId && (
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={resetForm}
            >
              Скасувати
            </button>
          )}
        </div>
      </form>

      <div className={styles.listHeader}>Існуючі цитати у базі ({quotes.length}):</div>
      <div className={styles.quotesList}>
        {quotes.map((item) => (
          <div key={item.id} className={styles.quoteRow}>
            <p className={styles.quoteText}>“{item.text}”</p>

            <div className={styles.rowActions}>
              <button
                type="button"
                className={styles.editBtn}
                onClick={() => handleStartEdit(item)}
                title="Редагувати"
              >
                <Edit size={16} />
              </button>

              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => handleDelete(item.id)}
                title="Видалити"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

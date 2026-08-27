'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, Edit, Star, Check } from '@/components/UI';
import styles from './AdminDatesWidget.module.css';
import { datesService } from '@/services/dates.service';
import { ImportantDate } from '@/components/modules/kitty/widgets/KittyOurDates/kittyOurDates.constants';

const MONTHS = [
  { value: '01', label: '01 — Січень' },
  { value: '02', label: '02 — Лютий' },
  { value: '03', label: '03 — Березень' },
  { value: '04', label: '04 — Квітень' },
  { value: '05', label: '05 — Травень' },
  { value: '06', label: '06 — Червень' },
  { value: '07', label: '07 — Липень' },
  { value: '08', label: '08 — Серпень' },
  { value: '09', label: '09 — Вересень' },
  { value: '10', label: '10 — Жовтень' },
  { value: '11', label: '11 — Листопад' },
  { value: '12', label: '12 — Грудень' },
];

const DAYS = Array.from({ length: 31 }, (_, i) => {
  const val = String(i + 1).padStart(2, '0');
  return { value: val, label: val };
});

export const AdminDatesWidget: React.FC = () => {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [month, setMonth] = useState('10');
  const [day, setDay] = useState('14');
  const [category, setCategory] = useState('Памʼятна дата');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    datesService.getDates().then((data) => {
      if (isMounted) {
        setDates(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const resetForm = () => {
    setTitle('');
    setMonth('10');
    setDay('14');
    setCategory('Памʼятна дата');
    setIsFavorite(false);
    setEditingId(null);
  };

  const handleStartEdit = (item: ImportantDate) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category || 'Памʼятна дата');
    setIsFavorite(Boolean(item.isFavorite));

    if (item.monthDay && item.monthDay.includes('-')) {
      const [m, d] = item.monthDay.split('-');
      setMonth(m || '10');
      setDay(d || '14');
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const monthDay = `${month}-${day}`;
    setIsSubmitting(true);

    try {
      if (editingId) {
        await datesService.updateDate(editingId, {
          title,
          monthDay,
          category,
          isFavorite,
        });
      } else {
        await datesService.createDate({
          title,
          monthDay,
          category,
          isFavorite,
        });
      }

      resetForm();
      const updated = await datesService.getDates();
      setDates(updated);
    } catch {
      alert('Помилка при збереженні дати');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Видалити цю дату?')) return;
    try {
      await datesService.deleteDate(id);
      if (editingId === id) resetForm();
      const updated = await datesService.getDates();
      setDates(updated);
    } catch {
      alert('Помилка видалення');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Calendar size={22} className={styles.headerIcon} />
        <span>Керування «Наші дати» 🗓️</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        <div className={styles.formTitle}>
          <span>{editingId ? 'Редагування дати ✏️' : 'Додати нову дату ✨'}</span>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Назва події</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Наприклад: День першого побачення 💕"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className={styles.rowInputs}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Місяць</label>
            <select
              className={styles.select}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>День</label>
            <select
              className={styles.select}
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              {DAYS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Категорія</label>
            <select
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Річниця">Річниця 💖</option>
              <option value="День народження">День народження 🎂</option>
              <option value="Памʼятна дата">Памʼятна дата ⭐️</option>
              <option value="Поїздка">Поїздка ✈️</option>
              <option value="Сюрприз">Сюрприз 🎁</option>
            </select>
          </div>
        </div>

        <label className={styles.checkboxGroup}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
          <span>Позначити зірочкою (⭐️) на дашборді Каті</span>
        </label>

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
                : 'Додати дату'}
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

      <div className={styles.listHeader}>Існуючі дати у базі:</div>
      <div className={styles.datesList}>
        {dates.map((item) => (
          <div key={item.id} className={styles.dateRow}>
            <div className={styles.dateLeft}>
              <span className={styles.monthDayBadge}>{item.monthDay}</span>
              <span className={styles.dateTitle}>{item.title}</span>
              {item.isFavorite && (
                <Star size={14} className={styles.star} fill="currentColor" />
              )}
            </div>

            <div className={styles.rowActions}>
              <button
                type="button"
                className={styles.editBtn}
                onClick={() => handleStartEdit(item)}
                title="Редагувати дату"
              >
                <Edit size={16} />
              </button>

              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => handleDelete(item.id)}
                title="Видалити дату"
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

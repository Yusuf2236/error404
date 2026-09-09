"use client";

import styles from "./page.module.css";
import adminStyles from "../admin.module.css";
import { useTranslation } from "@/lib/LanguageContext";

export default function SettingsPage() {
    const { t } = useTranslation();

    return (
        <div className={adminStyles.mainContent}>
            <div className={adminStyles.header}>
                <h1>{t('systemConfigurations')}</h1>
            </div>

            <div className={styles.settingsGrid}>
                <section className={adminStyles.glassCard}>
                    <h2>🏨 {t('propertyMetadata')}</h2>
                    <div className={styles.formGroup}>
                        <label>{t('resortName')}</label>
                        <input type="text" defaultValue="VIP UZBE Premium Residency" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>{t('operationalCurrency')}</label>
                        <select defaultValue="USD">
                            <option value="USD">USD ($)</option>
                            <option value="UZS">UZS (So'm)</option>
                        </select>
                    </div>
                    <button className={styles.saveBtn}>{t('synchronizeChanges')}</button>
                </section>

                <section className={adminStyles.glassCard}>
                    <h2>🔐 {t('securityIntelligence')}</h2>
                    <div className={styles.formGroup}>
                        <label>{t('adminAccessLevel')}</label>
                        <div className={styles.badge}>{t('superAdmin')}</div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>{t('sessionManagement')}</label>
                        <button className={styles.actionBtn}>{t('purgeAllSessions')}</button>
                    </div>
                </section>

                <section className={adminStyles.glassCard}>
                    <h2>💳 {t('paymentMethodsManagement')}</h2>
                    <div className={styles.paymentMethodsGrid}>
                        {['Click', 'Payme', 'Visa', 'Cash'].map(method => (
                            <div key={method} className={styles.paymentItem}>
                                <div className={styles.paymentInfo}>
                                    <span style={{ fontWeight: 700 }}>{method}</span>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{t(method.toLowerCase() as any)} - {t('operational')}</span>
                                </div>
                                <label className={styles.switch}>
                                    <input type="checkbox" defaultChecked />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={adminStyles.glassCard}>
                    <h2>📊 {t('operationalDefaults')}</h2>
                    <div className={styles.formGroup}>
                        <label>{t('defaultCheckIn')}</label>
                        <input type="time" defaultValue="14:00" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>{t('defaultCheckOut')}</label>
                        <input type="time" defaultValue="12:00" />
                    </div>
                </section>
            </div>
        </div>
    );
}

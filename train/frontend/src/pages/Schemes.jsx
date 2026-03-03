import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoice } from '../context/VoiceContext';
import { useLanguage } from '../context/LanguageContext';
import { DATA_SOURCES, getLastUpdated } from '../utils/dataSources';
import ThemeToggle from '../components/ThemeToggle';

const Schemes = () => {
    const navigate = useNavigate();
    const { speak } = useVoice();
    const { t } = useLanguage();

    // Flatten the data sources into a single list for the "previous format" card style
    const allResources = Object.entries(DATA_SOURCES).flatMap(([category, items]) =>
        Object.values(items).map(item => ({
            ...item,
            category: category // Add category key for the UI tag
        }))
    );

    const handleVisit = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors">
            <div className="bg-mitron-green text-white p-4 sticky top-0 shadow-md flex items-center justify-between z-10">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="mr-4 text-2xl">←</button>
                    <h1 className="text-xl font-bold">{t('governmentSchemes')}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <div className="text-xs opacity-80 text-right hidden sm:block">
                        {t('updated')}: {getLastUpdated()}
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {allResources.map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-green-50 dark:from-green-950 dark:to-green-900 p-5 rounded-xl shadow-md border border-green-100 dark:border-green-900 transition-colors">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg text-mitron-dark dark:text-green-50">{item.name}</h3>
                            <button onClick={() => speak(`${item.name}. ${item.description}`)} className="text-mitron-green text-xl">🔊</button>
                        </div>
                        <p className="text-gray-600 dark:text-green-200 mt-2 text-sm">{item.description}</p>

                        <div className="mt-4 flex gap-2">
                            <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-lg text-xs font-bold capitalize">
                                {item.category}
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg text-xs font-bold">
                                {item.eligibility}
                            </div>
                        </div>

                        <button
                            onClick={() => handleVisit(item.url)}
                            className="w-full mt-4 border border-mitron-green text-mitron-green dark:text-green-400 dark:border-green-400 py-2 rounded-lg font-bold hover:bg-mitron-green hover:text-white transition"
                        >
                            {t('visitPortal')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schemes;

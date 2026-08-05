import React, { useState } from 'react';
import {
  X,
  Settings,
  Volume2,
  VolumeX,
  Check,
  Mail,
  Save
} from 'lucide-react';

import { UserPreferences, NewsCategory, ViewMode } from '../types';
import { CATEGORIES_CONFIG } from './CategoryNav';


interface PreferencesModalProps {
  isOpen: boolean;
  preferences: UserPreferences;
  onClose: () => void;
  onSavePreferences: (newPrefs: Partial<UserPreferences>) => void;
}


export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  isOpen,
  preferences,
  onClose,
  onSavePreferences
}) => {


  const [selectedCats, setSelectedCats] = useState<NewsCategory[]>(
    preferences.selectedCategories || ['all']
  );


  const [viewMode, setViewMode] = useState<ViewMode>(
    preferences.viewMode || 'grid'
  );


  const [autoRefresh, setAutoRefresh] = useState<number>(
    preferences.autoRefreshSeconds || 60
  );


  const [soundEnabled, setSoundEnabled] = useState<boolean>(
    preferences.enableSoundNotifications
  );


  const [pushEnabled, setPushEnabled] = useState<boolean>(
    preferences.pushEnabled
  );


  const [minImpact, setMinImpact] = useState<number>(
    preferences.minImpactScoreFilter || 0
  );


  const [email, setEmail] = useState<string>(
    preferences.email || ''
  );


  const [savedSuccess, setSavedSuccess] = useState(false);



  if (!isOpen) return null;



  const toggleCategory = (cat: NewsCategory) => {

    if (cat === 'all') {
      setSelectedCats(['all']);
      return;
    }


    const withoutAll =
      selectedCats.filter(
        c => c !== 'all'
      );


    if (withoutAll.includes(cat)) {

      const next =
        withoutAll.filter(
          c => c !== cat
        );


      setSelectedCats(
        next.length ? next : ['all']
      );


    } else {

      setSelectedCats([
        ...withoutAll,
        cat
      ]);

    }

  };



  const handleSave = () => {

    onSavePreferences({

      selectedCategories: selectedCats,

      viewMode,

      autoRefreshSeconds: autoRefresh,

      enableSoundNotifications: soundEnabled,

      pushEnabled,

      minImpactScoreFilter: minImpact,

      email

    });


    setSavedSuccess(true);


    setTimeout(() => {

      setSavedSuccess(false);

      onClose();

    }, 800);

  };



  return (

    <div
      onClick={onClose}
      className="
      fixed inset-0 z-50
      flex items-center justify-center
      p-4
      bg-black/80
      backdrop-blur-md
      "
    >


      <div

        onClick={(e)=>e.stopPropagation()}

        className="
        w-full max-w-2xl
        bg-[#0B0F17]
        border border-gray-800
        rounded-3xl
        shadow-2xl
        overflow-hidden
        "

      >


        {/* HEADER */}

        <div className="
        flex items-center justify-between
        px-6 py-4
        border-b border-gray-800
        bg-gray-950
        ">


          <div className="
          flex items-center gap-2
          text-white
          font-mono
          font-bold
          text-sm
          ">

            <Settings className="w-4 h-4 text-cyan-400"/>

            PUSH PREFERENCES

          </div>


          <button
            onClick={onClose}
            className="
            p-2 rounded-lg
            bg-gray-900
            text-gray-400
            hover:text-white
            "
          >

            <X className="w-5 h-5"/>

          </button>


        </div>





        {/* BODY */}

        <div className="
        p-6 space-y-6
        max-h-[75vh]
        overflow-y-auto
        ">



          {/* EMAIL */}

          <div className="
          p-4 rounded-2xl
          bg-gray-900
          border border-gray-800
          ">


            <label className="
            text-xs
            text-cyan-300
            font-mono
            font-bold
            ">

              EMAIL

            </label>


            <div className="relative mt-3">

              <Mail
                className="
                absolute left-3 top-2.5
                w-4 h-4 text-gray-500
                "
              />


              <input

                value={email}

                onChange={
                  e=>setEmail(e.target.value)
                }

                className="
                w-full
                bg-gray-950
                border border-gray-800
                rounded-xl
                py-2 pl-10
                text-white
                "

              />


            </div>


          </div>





          {/* PUSH + SOUND */}

          <div className="
          grid sm:grid-cols-2 gap-4
          ">


            <button

              onClick={() =>
                setPushEnabled(
                  !pushEnabled
                )
              }

              className={`
              p-4 rounded-xl
              border
              ${
                pushEnabled
                ?
                'border-cyan-500 bg-cyan-950 text-cyan-300'
                :
                'border-gray-800 bg-gray-900 text-gray-400'
              }
              `}

            >

              🔔 Push Alerts

            </button>




            <button

              onClick={() =>
                setSoundEnabled(
                  !soundEnabled
                )
              }

              className="
              p-4 rounded-xl
              border border-gray-800
              bg-gray-900
              flex items-center
              justify-center gap-2
              text-white
              "

            >

              {
                soundEnabled
                ?
                <Volume2/>
                :
                <VolumeX/>
              }

              Sound

            </button>


          </div>





          {/* CATEGORIES */}

          <div className="
          p-4 rounded-xl
          bg-gray-900
          border border-gray-800
          ">


            <div className="flex flex-wrap gap-2">


              {
                CATEGORIES_CONFIG.map(cat => (

                  <button

                    key={cat.id}

                    onClick={() =>
                      toggleCategory(cat.id)
                    }

                    className={`
                    px-3 py-2
                    rounded-xl
                    text-xs
                    border
                    ${
                      selectedCats.includes(cat.id)
                      ?
                      'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      :
                      'border-gray-800 text-gray-400'
                    }
                    `}

                  >

                    {cat.label}

                  </button>

                ))
              }


            </div>


          </div>



        </div>






        {/* FOOTER */}

        <div className="
        px-6 py-4
        border-t border-gray-800
        bg-gray-950
        flex justify-between
        ">


          <button

            onClick={onClose}

            className="
            text-gray-400
            "

          >

            Cancel

          </button>




          <button

            onClick={handleSave}

            className="
            px-5 py-2
            rounded-xl
            bg-cyan-600
            text-white
            flex items-center gap-2
            "

          >

            {
              savedSuccess
              ?
              <Check className="w-4 h-4"/>
              :
              <Save className="w-4 h-4"/>
            }

            {
              savedSuccess
              ?
              'Saved'
              :
              'Save'
            }


          </button>


        </div>



      </div>


    </div>

  );

};

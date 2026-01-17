import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

function GetTabletTemplate()
{
    return {
        uuid: crypto.randomUUID(),
        title: 'Untitled',
        text: '',
        isSealed: false,
        dateSealed: {
            month: undefined,
            year: undefined
        },
        collection_uuid: undefined
    }
}


function ChoiceUUID(list)
{  
    if (!list || list.length === 0) return null

    let index = Math.floor(Math.random() * list.length)

    return list[index].uuid
}

const DefaulTablet = GetTabletTemplate()

export const useSealStore = create(
    persist(
        (set) => ({
            collections: [],
            tablets: [
                DefaulTablet
            ],
            tabletSelected_uuid: DefaulTablet.uuid,

            addTablet: () => {
                const NewTablet = GetTabletTemplate()

                set((state) => ({
                    tablets: [...state.tablets, NewTablet],
                    tabletSelected_uuid: NewTablet.uuid
                }))
            },

            removeTablet: (uuid) => {
                set((state) => {
                    const newTablets = state.tablets.filter((tab) => tab.uuid !== uuid)
                    const newSelected = ChoiceUUID(newTablets)

                    return {
                        tablets: newTablets,
                        tabletSelected_uuid: newSelected
                    }
                })
            },

            updateTablet: (uuid, newData) => {
                set((state) => ({
                    tablets: state.tablets.map((tab) => tab.uuid === uuid
                    ?
                        newData
                    : 
                        tab
                    )
                }))
            },

            addCollection: (newCollection) => set((state) => ({
                collections: [...state.collections, newCollection]
            })),

            setTabletSelected: (uuid) => set(() => ({
                tabletSelected_uuid: uuid
            })),

            addRecents: (newRecent) => set((state) => ({
                recents: [...state.recents, newRecent]
            }))
        }),
        {
            name: 'seal-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)
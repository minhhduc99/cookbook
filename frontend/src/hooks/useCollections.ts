import collectionStore from '../stores/collectionsStore';
import userStore from '../stores/userStore';
import useCurrentUser from './useCurrentUser';

export default function useCollections(): {
    collections: collection[];
    fetchCollections: () => void;
    addNewCollection: (collection_name: string) => void;
    removeCollection: (collection_name: string) => void;
    addToCollection: (collection_name: string, recipe: recipeMeta) => void;
    removeFromCollection: (collection_name: string, recipe: recipeMeta) => void;
} {
    const { collections, setCollections } = collectionStore();
    const user = userStore(state => state.user);
    const { fetchAsUser, fetchJsonAsUser } = useCurrentUser();

    const fetchCollections = () =>
        user &&
        fetchJsonAsUser<{ collections: collection[] }>(`/api/collections`)
            .then(data => {
                setCollections(data.collections);
                // console.log('fetched collections');
            })
            .catch(e => console.log("couldn't fetch collections"));

    const addToCollection = (collection_name: string, recipe: recipeMeta) => {
        fetchAsUser(`/api/collections/${collection_name}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipe.id })
        }).then(res => {
            if (res.ok) {
                window.alert(`${recipe.name} was added to ${collection_name}!`);
                fetchCollections();
            } else window.alert('try again:(');
        });
    };

    const removeFromCollection = (
        collection_name: string,
        recipe: recipeMeta
    ) => {
        fetchAsUser(`/api/collections/${collection_name}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipe.id })
        }).then(res => {
            if (res.ok) {
                window.alert(
                    `${recipe.name} was removed from ${collection_name}!`
                );
                fetchCollections();
            } else window.alert('try again:(');
        });
    };

    const addNewCollection = (collection_name: string) => {
        fetchAsUser(`api/collections`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collection_name: collection_name })
        }).then(res => {
            if (res.ok) {
                window.alert(`${collection_name} was added`);
                fetchCollections();
            } else window.alert(`try again`);
        });
    };

    const removeCollection = (collection_name: string) => {
        fetchAsUser(`api/collections`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collection_name: collection_name })
        }).then(res => {
            if (res.ok) {
                window.alert(`${collection_name} was deleted`);
                fetchCollections();
            } else window.alert(`try again`);
        });
    };

    return {
        collections,
        fetchCollections,
        addNewCollection,
        removeCollection,
        addToCollection,
        removeFromCollection
    };
}

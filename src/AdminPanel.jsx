import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        fetchData();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "Diecue_kit"));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    setData(items);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleCreate = async () => {
    if (!newItem) return;
    await addDoc(collection(db, "Diecue_kit"), { name: newItem, createdAt: serverTimestamp() });
    setNewItem('');
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Diecue_kit", id));
    fetchData();
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  if (!user) {
    return (
      <div style={styles.container}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="email" 
            placeholder="Admin Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={styles.input}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </header>
      
      <div style={styles.content}>
        <h3>Manage Disease Records</h3>
        <div style={styles.addBox}>
          <input 
            type="text" 
            placeholder="Add new entry..." 
            value={newItem} 
            onChange={(e) => setNewItem(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleCreate} style={styles.button}>Add Record</button>
        </div>

        <div style={styles.list}>
          {data.map(item => (
            <div key={item.id} style={styles.item}>
              <span>{item.name || item.id}</span>
              <button onClick={() => handleDelete(item.id)} style={styles.deleteBtn}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' },
  button: { padding: '10px', backgroundColor: '#7C3AED', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  logoutBtn: { backgroundColor: '#EF4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' },
  content: { background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  addBox: { display: 'flex', gap: '10px', marginBottom: '20px' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  item: { display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#F9FAFB', borderRadius: '4px' },
  deleteBtn: { backgroundColor: 'transparent', color: '#EF4444', border: '1px solid #EF4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }
};

export default AdminPanel;

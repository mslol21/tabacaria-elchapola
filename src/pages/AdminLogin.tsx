import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded check as requested for temporary protection
    if (username === 'admin' && password === 'gabi123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6">
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-white transition-all group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Voltar para a Loja
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <img src="/logo.png" alt="Logo" className="h-20 mx-auto mb-6" />
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Painel Administrativo</h1>
          <p className="text-white/40">Entre com suas credenciais para gerenciar a loja.</p>
        </div>

        <div className="glass-dark p-8 md:p-10 rounded-[40px] border border-white/5">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block ml-1">Usuário</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-brand-primary outline-none transition-all"
                  placeholder="Seu usuário"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-brand-primary outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-brand-accent text-sm font-bold text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-brand-dark font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-brand-primary/20 transition-all"
            >
              <LogIn size={20} />
              ENTRAR NO PAINEL
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

'use client';

import { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
const {
  Trash2,
  Plus,
  Loader2,
  GripVertical,
  AlertTriangle,
  X,
  Layers,
  Component,
  Link2,
  Link2Off,
  Folder,
  Code2,
  Eye,
  EyeOff,
} = LucideIcons;
import { Reorder, motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function SkillsDashboard() {
  const [categories, setCategories] = useState<any[]>([]);
  const [arsenal, setArsenal] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'skills' | 'arsenal' | 'categories'
  >('skills');

  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'skill' | 'arsenal' | 'category';
    data: any;
  } | null>(null);

  // Form states for Category Skill
  const [newSkillCategory, setNewSkillCategory] = useState(
    'Frontend Architecture',
  );
  const [newSkillLabel, setNewSkillLabel] = useState('');
  const [newSkillName, setNewSkillName] = useState('');

  // Form states for Arsenal
  const [newArsenalName, setNewArsenalName] = useState('');
  const [newArsenalImage, setNewArsenalImage] = useState(
    'https://skillicons.dev/icons?i=',
  );
  const [isSyncEnabled, setIsSyncEnabled] = useState(true);

  // Form states for New Category
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('Layers');
  const [newCategoryColor, setNewCategoryColor] = useState('#0082c4');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [skillsRes, arsenalRes] = await Promise.all([
        fetch('/api/skills').then((r) => r.json()),
        fetch('/api/arsenal').then((r) => r.json()),
      ]);
      if (skillsRes.success) setCategories(skillsRes.data);
      if (arsenalRes.success) setArsenal(arsenalRes.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const handleAddCategorySkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillLabel || !newSkillName) return;
    try {
      await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: newSkillCategory,
          label: newSkillLabel,
          name: newSkillName,
        }),
      });
      setNewSkillLabel('');
      setNewSkillName('');
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryTitle || !newCategoryIcon || !newCategoryColor) return;
    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newCategoryTitle,
          icon: newCategoryIcon,
          accentHex: newCategoryColor,
        }),
      });
      setNewCategoryTitle('');
      setNewCategoryIcon('Layers');
      setNewCategoryColor('#0082c4');
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleCategoryVisibility = async (
    id: string,
    currentStatus: boolean,
  ) => {
    try {
      await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isHidden: !currentStatus }),
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const requestDeleteCategorySkill = (
    categoryTitle: string,
    skillName: string,
  ) => {
    setDeleteTarget({ type: 'skill', data: { categoryTitle, skillName } });
    setDeleteModalOpen(true);
  };

  const requestDeleteCategory = (id: string) => {
    setDeleteTarget({ type: 'category', data: id });
    setDeleteModalOpen(true);
  };

  const requestDeleteArsenal = (id: string) => {
    setDeleteTarget({ type: 'arsenal', data: id });
    setDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!deleteTarget) return;
    setDeleteModalOpen(false);

    if (deleteTarget.type === 'skill') {
      const { categoryTitle, skillName } = deleteTarget.data;
      try {
        await fetch(
          `/api/skills?category=${encodeURIComponent(categoryTitle)}&name=${encodeURIComponent(skillName)}`,
          {
            method: 'DELETE',
          },
        );
        fetchData();
      } catch (error) {
        console.error(error);
      }
    } else if (deleteTarget.type === 'arsenal') {
      const id = deleteTarget.data;
      try {
        await fetch(`/api/arsenal?id=${id}`, {
          method: 'DELETE',
        });
        fetchData();
      } catch (error) {
        console.error(error);
      }
    } else if (deleteTarget.type === 'category') {
      const id = deleteTarget.data;
      try {
        await fetch(`/api/categories?id=${id}`, {
          method: 'DELETE',
        });
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleReorderCategorySkills = async (
    categoryTitle: string,
    newSkills: any[],
  ) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.title === categoryTitle ? { ...c, skills: newSkills } : c,
      ),
    );

    try {
      await fetch('/api/skills/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: categoryTitle, skills: newSkills }),
      });
    } catch (error) {
      console.error('Failed to save order', error);
    }
  };

  const handleAddArsenal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArsenalName || !newArsenalImage) return;
    try {
      await fetch('/api/arsenal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newArsenalName, image: newArsenalImage }),
      });
      setNewArsenalName('');
      setNewArsenalImage('https://skillicons.dev/icons?i=');
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReorderArsenal = async (newArsenalList: any[]) => {
    setArsenal(newArsenalList);
    try {
      const orderData = newArsenalList.map((item, index) => ({
        id: item._id,
        order: index,
      }));
      await fetch('/api/arsenal/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: orderData }),
      });
    } catch (error) {
      console.error('Failed to save arsenal order', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#0082c4]" />
      </div>
    );
  }

  return (
    <div className="relative mx-auto min-h-screen max-w-7xl px-3 pt-24 pb-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-800 md:mb-8 md:text-3xl dark:text-white">
        Skills & Arsenal Management
      </h1>

      {/* Tabs */}
      <div className="mx-auto mb-6 flex w-full flex-col space-y-2 rounded-xl bg-slate-100 p-1 sm:mx-0 sm:w-max sm:flex-row sm:space-y-0 sm:space-x-1 md:mb-8 dark:bg-white/5">
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all sm:flex-none md:px-6 md:py-2.5 md:text-sm ${activeTab === 'categories' ? 'bg-white text-slate-900 shadow-sm dark:bg-[#151923] dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
        >
          <Folder className="h-4 w-4" /> Categories
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all sm:flex-none md:px-6 md:py-2.5 md:text-sm ${activeTab === 'skills' ? 'bg-white text-slate-900 shadow-sm dark:bg-[#151923] dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
        >
          <Layers className="h-4 w-4" /> Category Skills
        </button>
        <button
          onClick={() => setActiveTab('arsenal')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all sm:flex-none md:px-6 md:py-2.5 md:text-sm ${activeTab === 'arsenal' ? 'bg-white text-slate-900 shadow-sm dark:bg-[#151923] dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
        >
          <Component className="h-4 w-4" /> Technology Arsenal
        </button>
      </div>

      <div className="w-full">
        {/* Categories Management */}
        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm md:p-6 dark:border-white/[0.06] dark:bg-black/50"
          >
            <h2 className="mb-4 text-lg font-bold md:text-xl">
              Manage Categories
            </h2>

            <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-3">
              {/* Left Column: Form */}
              <div className="xl:col-span-1">
                <form
                  onSubmit={handleAddCategory}
                  className="sticky top-24 space-y-4 rounded-lg border border-slate-200/50 bg-slate-50 p-4 md:p-5 dark:border-white/[0.02] dark:bg-white/5"
                >
                  <div>
                    <label className="mb-1 block text-xs font-medium md:text-sm">
                      Category Title
                    </label>
                    <input
                      type="text"
                      value={newCategoryTitle}
                      onChange={(e) => setNewCategoryTitle(e.target.value)}
                      className="w-full rounded-md border border-slate-300 p-1.5 text-xs md:p-2 md:text-sm dark:border-slate-700 dark:bg-black"
                      placeholder="e.g. Mobile Development"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium md:text-sm">
                      Icon (lucide-react name)
                    </label>
                    <input
                      type="text"
                      value={newCategoryIcon}
                      onChange={(e) => setNewCategoryIcon(e.target.value)}
                      className="w-full rounded-md border border-slate-300 p-1.5 text-xs md:p-2 md:text-sm dark:border-slate-700 dark:bg-black"
                      placeholder="e.g. Smartphone"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-[#0082c4] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0099e6] md:px-4 md:py-2 md:text-sm"
                  >
                    <Plus className="h-4 w-4" /> Add Category
                  </button>
                </form>
              </div>

              {/* Right Column: Categories List */}
              <div className="xl:col-span-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  {categories.map((cat, i) => {
                    const getIcon = (name: string) => {
                      if (!name) return Code2;
                      if ((LucideIcons as any)[name])
                        return (LucideIcons as any)[name];
                      const pascalName = name
                        .split('-')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join('');
                      return (LucideIcons as any)[pascalName] || Code2;
                    };
                    const CatIcon = getIcon(cat.icon);
                    return (
                      <div
                        key={i}
                        className={`flex flex-col justify-between rounded-xl border p-3 transition-opacity md:p-4 ${cat.isHidden ? 'border-slate-200 bg-slate-100 opacity-60 grayscale dark:border-white/[0.03] dark:bg-black' : 'border-slate-100 bg-slate-50/50 dark:border-white/[0.05] dark:bg-white/[0.02]'}`}
                      >
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <div
                              className="flex h-6 w-6 items-center justify-center rounded-lg md:h-8 md:w-8"
                              style={{
                                backgroundColor: `${cat.accentHex}20`,
                                color: cat.accentHex,
                              }}
                            >
                              <CatIcon className="h-3 w-3 md:h-4 md:w-4" />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-800 md:text-base dark:text-slate-200">
                              {cat.title}
                            </h3>
                            {cat.isHidden && (
                              <span className="ml-2 rounded-full bg-slate-200 px-1.5 py-0.5 text-[8px] font-bold text-slate-400 uppercase md:px-2 md:text-[10px] dark:bg-white/10">
                                Hidden
                              </span>
                            )}
                          </div>
                          <p className="mb-4 text-[10px] text-slate-500 md:text-xs">
                            {cat.skills ? cat.skills.length : 0} Skills
                          </p>
                        </div>
                        <div className="flex gap-2 self-end">
                          <button
                            onClick={() =>
                              handleToggleCategoryVisibility(
                                cat._id,
                                !!cat.isHidden,
                              )
                            }
                            className="flex items-center gap-1 rounded-md p-1.5 text-[10px] text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 md:p-2 md:text-xs dark:hover:bg-white/10 dark:hover:text-slate-300"
                          >
                            {cat.isHidden ? (
                              <Eye className="h-3 w-3" />
                            ) : (
                              <EyeOff className="h-3 w-3" />
                            )}
                            {cat.isHidden ? 'Show' : 'Hide'}
                          </button>
                          <button
                            onClick={() => requestDeleteCategory(cat._id)}
                            className="flex items-center gap-1 rounded-md p-1.5 text-[10px] text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 md:p-2 md:text-xs dark:hover:bg-red-500/10"
                          >
                            <Trash2 className="h-3 w-3" /> Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Skills Management */}
        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm md:p-6 dark:border-white/[0.06] dark:bg-black/50"
          >
            <h2 className="mb-4 text-lg font-bold md:text-xl">
              Category Skills
            </h2>

            <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-3">
              {/* Left Column: Form */}
              <div className="xl:col-span-1">
                <form
                  onSubmit={handleAddCategorySkill}
                  className="sticky top-24 space-y-4 rounded-lg border border-slate-200/50 bg-slate-50 p-4 md:p-5 dark:border-white/[0.02] dark:bg-white/5"
                >
                  <div>
                    <label className="mb-1 block text-xs font-medium md:text-sm">
                      Category
                    </label>
                    <select
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value)}
                      className="w-full rounded-md border border-slate-300 p-1.5 text-xs md:p-2 md:text-sm dark:border-slate-700 dark:bg-black"
                    >
                      {categories.map((cat, i) => (
                        <option key={cat._id || i} value={cat.title}>
                          {cat.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium md:text-sm">
                      Label (e.g. Modern UI)
                    </label>
                    <input
                      type="text"
                      value={newSkillLabel}
                      onChange={(e) => setNewSkillLabel(e.target.value)}
                      className="w-full rounded-md border border-slate-300 p-1.5 text-xs md:p-2 md:text-sm dark:border-slate-700 dark:bg-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium md:text-sm">
                      Name (e.g. React)
                    </label>
                    <input
                      type="text"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="w-full rounded-md border border-slate-300 p-1.5 text-xs md:p-2 md:text-sm dark:border-slate-700 dark:bg-black"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-[#0082c4] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0099e6] md:px-4 md:py-2 md:text-sm"
                  >
                    <Plus className="h-4 w-4" /> Add Skill
                  </button>
                </form>
              </div>

              {/* Right Column: Categories */}
              <div className="xl:col-span-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  {categories.map((cat, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 md:p-4 dark:border-white/[0.05] dark:bg-white/[0.02]"
                    >
                      <h3 className="mb-3 text-sm font-semibold text-[#0082c4] md:text-base">
                        {cat.title}
                      </h3>

                      {cat.skills && cat.skills.length > 0 ? (
                        <Reorder.Group
                          axis="y"
                          values={cat.skills}
                          onReorder={(newSkills) =>
                            handleReorderCategorySkills(cat.title, newSkills)
                          }
                          className="space-y-2"
                        >
                          {cat.skills.map((skill: any) => (
                            <Reorder.Item
                              key={skill.name}
                              value={skill}
                              className="flex cursor-grab items-center justify-between rounded-md border border-slate-200 bg-white p-2 text-xs shadow-sm transition-colors hover:border-[#0082c4]/40 active:cursor-grabbing md:p-3 md:text-sm dark:border-slate-800 dark:bg-[#11141c]"
                            >
                              <div className="flex items-center gap-2 md:gap-3">
                                <GripVertical className="h-3 w-3 text-slate-400 md:h-4 md:w-4" />
                                <div>
                                  <span className="font-mono text-[8px] text-slate-500 uppercase md:text-[10px]">
                                    {skill.label}
                                  </span>
                                  <p className="text-xs font-medium md:text-sm">
                                    {skill.name}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  requestDeleteCategorySkill(
                                    cat.title,
                                    skill.name,
                                  )
                                }
                                className="p-1 text-red-500 transition-colors hover:text-red-600"
                              >
                                <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                              </button>
                            </Reorder.Item>
                          ))}
                        </Reorder.Group>
                      ) : (
                        <p className="text-xs text-slate-500 md:text-sm">
                          No skills added yet.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Technology Arsenal Management */}
        {activeTab === 'arsenal' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm md:p-6 dark:border-white/[0.06] dark:bg-black/50"
          >
            <h2 className="mb-4 text-lg font-bold md:text-xl">
              Technology Arsenal
            </h2>

            <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-3">
              {/* Left Column: Form */}
              <div className="xl:col-span-1">
                <form
                  onSubmit={handleAddArsenal}
                  className="sticky top-24 space-y-4 rounded-lg border border-slate-200/50 bg-slate-50 p-4 md:p-5 dark:border-white/[0.02] dark:bg-white/5"
                >
                  <div>
                    <label className="mb-1 block text-xs font-medium md:text-sm">
                      Technology Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <button
                          type="button"
                          onClick={() => setIsSyncEnabled(!isSyncEnabled)}
                          className={`flex items-center justify-center rounded p-1 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700 ${isSyncEnabled ? 'text-[#0082c4]' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                          title={
                            isSyncEnabled
                              ? 'Auto-sync enabled'
                              : 'Auto-sync disabled'
                          }
                        >
                          {isSyncEnabled ? (
                            <Link2 className="h-4 w-4" />
                          ) : (
                            <Link2Off className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={newArsenalName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNewArsenalName(val);
                          if (isSyncEnabled) {
                            setNewArsenalImage(
                              `https://skillicons.dev/icons?i=${val.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
                            );
                          }
                        }}
                        className="w-full rounded-md border border-slate-300 p-1.5 pl-9 text-xs md:p-2 md:pl-10 md:text-sm dark:border-slate-700 dark:bg-black"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium md:text-sm">
                      Image URL (skillicons.dev or other)
                    </label>
                    <input
                      type="text"
                      value={newArsenalImage}
                      onChange={(e) => setNewArsenalImage(e.target.value)}
                      className="w-full rounded-md border border-slate-300 p-1.5 text-xs md:p-2 md:text-sm dark:border-slate-700 dark:bg-black"
                      required
                      placeholder="https://skillicons.dev/icons?i=react"
                    />
                  </div>

                  {newArsenalImage &&
                    newArsenalImage !== 'https://skillicons.dev/icons?i=' && (
                      <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#11141c]">
                        <span className="text-xs font-medium text-slate-500">
                          Live Preview
                        </span>
                        <img
                          src={`${newArsenalImage}&theme=${mounted && theme === 'dark' ? 'dark' : 'light'}`}
                          alt="Preview"
                          className="h-10 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            if (e.currentTarget.nextElementSibling) {
                              e.currentTarget.nextElementSibling.classList.remove(
                                'hidden',
                              );
                            }
                          }}
                          onLoad={(e) => {
                            e.currentTarget.style.display = 'block';
                            if (e.currentTarget.nextElementSibling) {
                              e.currentTarget.nextElementSibling.classList.add(
                                'hidden',
                              );
                            }
                          }}
                        />
                        <span className="hidden text-xs font-medium text-red-500">
                          Failed to load icon
                        </span>
                      </div>
                    )}
                  <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-[#0082c4] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0099e6] md:px-4 md:py-2 md:text-sm"
                  >
                    <Plus className="h-4 w-4" /> Add to Arsenal
                  </button>
                </form>
              </div>

              {/* Right Column: Arsenal List */}
              <div className="xl:col-span-2">
                {arsenal.length > 0 ? (
                  <Reorder.Group
                    axis="y"
                    values={arsenal}
                    onReorder={handleReorderArsenal}
                    className="space-y-2 md:space-y-3"
                  >
                    {arsenal.map((item) => (
                      <Reorder.Item
                        key={item._id}
                        value={item}
                        className="flex cursor-grab items-center justify-between rounded-md border border-slate-200 bg-white p-3 text-xs shadow-sm transition-colors hover:border-[#0082c4]/40 active:cursor-grabbing md:p-4 md:text-sm dark:border-slate-800 dark:bg-[#11141c]"
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <GripVertical className="h-4 w-4 text-slate-400 md:h-5 md:w-5" />
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 md:h-10 md:w-10 dark:bg-white/5">
                            <img
                              src={`${item.image}&theme=${mounted && theme === 'dark' ? 'dark' : 'light'}`}
                              alt={item.name}
                              className="h-5 w-5 object-contain md:h-6 md:w-6"
                            />
                          </div>
                          <span className="text-sm font-semibold text-slate-800 md:text-base dark:text-slate-200">
                            {item.name}
                          </span>
                        </div>
                        <button
                          onClick={() => requestDeleteArsenal(item._id)}
                          className="rounded-md p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 md:p-2 dark:hover:bg-red-500/10"
                        >
                          <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                        </button>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-12 text-slate-500 dark:border-slate-700">
                    <p>No arsenal items added yet.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-50 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-[#11141c]"
            >
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="absolute top-4 right-4 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6 flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-500" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  Delete Confirmation
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDelete}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-red-500/20 transition-colors hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

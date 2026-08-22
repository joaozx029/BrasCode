import { useState, useEffect } from 'react'
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaCheckCircle,
  FaDiscord,
  FaPlus,
  FaCompass,
  FaHeadset,
  FaMicrophone,
  FaHeadphones,
  FaCog,
  FaUserFriends,
  FaSearch,
  FaInbox,
  FaQuestionCircle,
  FaChevronRight,
  FaGem,
  FaTimes,
  FaUser,
  FaBell,
  FaCommentDots,
  FaCreditCard,
  FaPen,
  FaImage,
  FaUpload
} from 'react-icons/fa'
import { MdOutlineStorefront, MdOutlinePrivacyTip } from 'react-icons/md'
import { HiOutlineSparkles } from 'react-icons/hi'
import './App.css'

// Assets — pastas: Profile Molduras | Avatar Molduras | Indentificação Moldura
import frameHydra from './assets/Profile Molduras/Hydra.png'

const PRESET_COLORS = [
  '#000000', '#4e5058', '#1a472a', '#5c4a1f', '#4a1942',
  '#5865f2', '#57f287', '#fee75c', '#eb459e', '#ed4245',
  '#f47b67', '#9b59b6', '#3498db', '#1abc9c', '#e67e22'
]

const AVATAR_STYLES = [
  { id: 'default', bg: 'linear-gradient(135deg, #f47b67, #f9a825)', label: 'Padrão' },
  { id: 'brasil', bg: 'linear-gradient(135deg, #009b3a, #fedf00)', label: 'Brasil' },
  { id: 'roxo', bg: 'linear-gradient(135deg, #5865f2, #7c3aed)', label: 'Roxo' },
  { id: 'verde', bg: 'linear-gradient(135deg, #23a559, #57f287)', label: 'Verde' },
  { id: 'rosa', bg: 'linear-gradient(135deg, #eb459e, #f47b67)', label: 'Rosa' },
  { id: 'azul', bg: 'linear-gradient(135deg, #00aff4, #5865f2)', label: 'Azul' },
]

/*
  Pastas de assets:
  - src/assets/Profile Molduras/     → molduras de perfil (efeito em volta do card/avatar)
  - src/assets/Avatar Molduras/      → decorações de avatar (anéis, coroas, etc.)
  - src/assets/Indentificação Moldura/ → placas de identificação
  Coloque as imagens nas pastas e importe aqui, depois coloque em owned ou shop.
*/

const FRAMES = {
  owned: [
    { id: 'none', name: 'Nenhum', free: true, image: null },
    { id: 'hydra', name: 'Hydra', free: true, image: frameHydra },
  ],
  shop: [
    { id: 'frame-shop-1', name: 'Moldura Neon', locked: true, image: null },
    { id: 'frame-shop-2', name: 'Moldura Dourada', locked: true, image: null },
    { id: 'frame-shop-3', name: 'Moldura Fogo', locked: true, image: null },
    { id: 'frame-shop-4', name: 'Moldura Cristal', locked: true, image: null },
    { id: 'frame-shop-5', name: 'Moldura Rosa', locked: true, image: null },
    { id: 'frame-shop-6', name: 'Moldura Verde', locked: true, image: null },
    { id: 'frame-shop-7', name: 'Moldura Roxa', locked: true, image: null },
    { id: 'frame-shop-8', name: 'Moldura Brasil', locked: true, image: null },
    { id: 'frame-shop-9', name: 'Moldura Gelo', locked: true, image: null },
    { id: 'frame-shop-10', name: 'Moldura Cyber', locked: true, image: null },
    { id: 'frame-shop-11', name: 'Moldura Floral', locked: true, image: null },
    { id: 'frame-shop-12', name: 'Moldura Dark', locked: true, image: null },
  ],
}

const AVATAR_DECOS = {
  owned: [
    { id: 'none', name: 'Nenhum', free: true, image: null },
  ],
  shop: [
    { id: 'deco-shop-1', name: 'Anel Ciano', locked: true, image: null },
    { id: 'deco-shop-2', name: 'Anel Dourado', locked: true, image: null },
    { id: 'deco-shop-3', name: 'Chifres', locked: true, image: null },
    { id: 'deco-shop-4', name: 'Coroa de Cristal', locked: true, image: null },
    { id: 'deco-shop-5', name: 'Aurora', locked: true, image: null },
    { id: 'deco-shop-6', name: 'Fogo Azul', locked: true, image: null },
    { id: 'deco-shop-7', name: 'Coração', locked: true, image: null },
    { id: 'deco-shop-8', name: 'Tubarão', locked: true, image: null },
    { id: 'deco-shop-9', name: 'Lua', locked: true, image: null },
  ],
}

const NAMEPLATES = {
  owned: [
    { id: 'none', name: 'Nenhum', free: true, image: null, bg: 'transparent' },
    { id: 'plate-owned-1', name: 'Roxo Glow', free: true, image: null, bg: 'linear-gradient(90deg, #9b59b6, #7c3aed)' },
  ],
  shop: [
    { id: 'plate-shop-1', name: 'Fadas', locked: true, image: null },
    { id: 'plate-shop-2', name: 'Inseto', locked: true, image: null },
    { id: 'plate-shop-3', name: 'Libélula', locked: true, image: null },
    { id: 'plate-shop-4', name: 'Besouro', locked: true, image: null },
    { id: 'plate-shop-5', name: 'Neon', locked: true, image: null },
  ],
}

const NAME_FONTS = [
  { id: 'default', name: 'Padrão', family: 'Inter, sans-serif' },
  { id: 'pixel', name: 'Pixel', family: '"Courier New", monospace' },
  { id: 'serif', name: 'Serif', family: 'Georgia, serif' },
  { id: 'mono', name: 'Mono', family: '"Lucida Console", monospace' },
  { id: 'fancy', name: 'Elegante', family: '"Palatino Linotype", Palatino, serif' },
  { id: 'bold', name: 'Pesado', family: 'Impact, sans-serif' },
  { id: 'script', name: 'Script', family: '"Brush Script MT", cursive' },
  { id: 'comic', name: 'Comic', family: '"Comic Sans MS", cursive' },
]

const NAME_EFFECTS = [
  { id: 'solid', name: 'Sólido' },
  { id: 'gradient', name: 'Gradiente' },
  { id: 'neon', name: 'Neon' },
  { id: 'desenho', name: 'Desenho' },
  { id: 'pop', name: 'Pop' },
  { id: 'gummy', name: 'Gummy' },
  { id: 'prism', name: 'Prism' },
]

const NAME_COLORS = [
  '#ffffff', '#57f287', '#00d4ff', '#5865f2', '#eb459e',
  '#fee75c', '#ed4245', '#ff6b35', '#9b59b6', '#1abc9c',
  '#2ecc71', '#3498db', '#e74c3c', '#f39c12'
]

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [errors, setErrors] = useState({ email: '', password: '', general: '' })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [friendUsername, setFriendUsername] = useState('')

  // Modais
  const [showSettings, setShowSettings] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [settingsTab, setSettingsTab] = useState('conta')
  const [settingsSub, setSettingsSub] = useState('info') // info | senha | dados | privacidade-perfil
  const [showEmail, setShowEmail] = useState(false)
  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showGoogleModal, setShowGoogleModal] = useState(false)
  const [themePreview, setThemePreview] = useState(false)
  const [authScreen, setAuthScreen] = useState('welcome') // welcome | login | register
  const [regUser, setRegUser] = useState('')
  const [regPass, setRegPass] = useState('')
  const [regPass2, setRegPass2] = useState('')
  const [regBirth, setRegBirth] = useState('')
  const [regErrors, setRegErrors] = useState({})
  // tema aplicado de verdade vs rascunho na prévia
  const [appliedTheme, setAppliedTheme] = useState({ theme: 'dark', colorTheme: null })
  const [draftTheme, setDraftTheme] = useState({ theme: 'dark', colorTheme: null })

  // Privacidade (toggles)
  const [privacy, setPrivacy] = useState({
    improveDiscord: true,
    personalize: true,
    sponsored: false,
    voiceClips: true,
    profileShare: 'everyone', // everyone | small | friends
    notifyProfileUpdate: true,
  })

  // Permissões de mensagens
  const [msgPerms, setMsgPerms] = useState({
    matureFriends: 'blur',
    matureOthers: 'block',
    matureServer: 'blur',
    ageAppCommands: false,
    ageServersIOS: false,
    spamFilter: 'all',
    dmServerMembers: true,
    filterUnknownMembers: true,
    friendEveryone: true,
    friendFoF: true,
    friendServer: true,
  })

  // Aparência
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    colorTheme: null,
    syncDevices: true,
    applyToProfiles: false,
    serverTheme: 'server',
    appIcon: 0,
    showMediaLinks: true,
    showMediaUpload: true,
    showEmbeds: true,
    showEmojiReactions: true,
    spoilers: 'click',
    splitTopics: true,
    showAvatars: true,
    previewMarkdown: true,
    convertEmoticons: true,
    stickersAutocomplete: false,
    gamesAutocomplete: true,
    sendButton: false,
    searchScope: 'selected',
    streamerMode: false,
    hidePersonal: true,
    hideInvites: true,
    disableSounds: true,
    disableNotifs: true,
  })

  // Perfil / decorações
  const [username, setUsername] = useState('')
  const [bannerColor, setBannerColor] = useState('#f47b67')
  const [bannerImage, setBannerImage] = useState(null)
  const [avatarStyle, setAvatarStyle] = useState('default')
  const [avatarImage, setAvatarImage] = useState(null)
  const [statusText, setStatusText] = useState('Disponível')
  const [bio, setBio] = useState('')
  const [pronouns, setPronouns] = useState('')
  const [showBannerPicker, setShowBannerPicker] = useState(false)
  const [showBannerMenu, setShowBannerMenu] = useState(false)
  const [showAvatarMenu, setShowAvatarMenu] = useState(false)
  const [hexInput, setHexInput] = useState('#f47b67')

  // Decorações
  const [frameId, setFrameId] = useState('none')
  const [avatarDecoId, setAvatarDecoId] = useState('none')
  const [nameFont, setNameFont] = useState('default')
  const [nameEffect, setNameEffect] = useState('solid')
  const [nameColor, setNameColor] = useState('#ffffff')
  const [nameplateId, setNameplateId] = useState('none')
  const [decoModal, setDecoModal] = useState(null) // 'frame' | 'avatarDeco' | 'nameStyle' | 'nameplate' | null
  const [tempDeco, setTempDeco] = useState(null) // seleção temporária no modal

  // Carrega dados salvos — NÃO auto-loga (usuário precisa logar de novo)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('discord_login')
      if (saved) {
        const data = JSON.parse(saved)
        if (data.email && data.rememberMe) setEmail(data.email)
        // senha não preenche automaticamente por segurança visual; remember só e-mail
        if (data.rememberMe !== undefined) setRememberMe(!!data.rememberMe)
      }
      // força tela de login
      setIsLoggedIn(false)

      const profile = localStorage.getItem('discord_profile')
      if (profile) {
        const p = JSON.parse(profile)
        if (p.username) setUsername(p.username)
        if (p.bannerColor) {
          setBannerColor(p.bannerColor)
          setHexInput(p.bannerColor)
        }
        if (p.bannerImage) setBannerImage(p.bannerImage)
        if (p.avatarStyle) setAvatarStyle(p.avatarStyle)
        if (p.avatarImage) setAvatarImage(p.avatarImage)
        if (p.statusText) setStatusText(p.statusText)
        if (p.bio) setBio(p.bio)
        if (p.pronouns) setPronouns(p.pronouns)
        if (p.frameId) setFrameId(p.frameId)
        if (p.avatarDecoId) setAvatarDecoId(p.avatarDecoId)
        if (p.nameFont) setNameFont(p.nameFont)
        if (p.nameEffect) setNameEffect(p.nameEffect)
        if (p.nameColor) setNameColor(p.nameColor)
        if (p.nameplateId) setNameplateId(p.nameplateId)
      }
      const appTheme = localStorage.getItem('discord_appearance')
      if (appTheme) {
        try {
          const t = JSON.parse(appTheme)
          setAppearance((prev) => ({ ...prev, ...t }))
          if (t.theme || t.colorTheme !== undefined) {
            setAppliedTheme({ theme: t.theme || 'dark', colorTheme: t.colorTheme ?? null })
            setDraftTheme({ theme: t.theme || 'dark', colorTheme: t.colorTheme ?? null })
          }
        } catch (_) {}
      }
    } catch (e) {}
  }, [])

  // Aplica tema no site inteiro — só o tema APLICADO (ou rascunho se estiver na prévia)
  useEffect(() => {
    const source = themePreview ? draftTheme : appliedTheme
    const root = document.documentElement
    const themes = {
      light: { bg: '#f2f3f5', sidebar: '#e3e5e8', panel: '#ffffff', text: '#060607', muted: '#4e5058', input: '#ffffff' },
      ash: { bg: '#313338', sidebar: '#2b2d31', panel: '#1e1f22', text: '#f2f3f5', muted: '#b5bac1', input: '#1e1f22' },
      dark: { bg: '#313338', sidebar: '#2b2d31', panel: '#1e1f22', text: '#f2f3f5', muted: '#b5bac1', input: '#1e1f22' },
      midnight: { bg: '#000000', sidebar: '#0a0a0a', panel: '#111111', text: '#f2f3f5', muted: '#949ba4', input: '#1a1a1a' },
      auto: { bg: '#313338', sidebar: '#2b2d31', panel: '#1e1f22', text: '#f2f3f5', muted: '#b5bac1', input: '#1e1f22' },
    }
    let t = themes[source.theme] || themes.dark
    if (source.colorTheme !== null && source.colorTheme !== undefined) {
      const colorBgs = [
        '#1a2e1a', '#2e2418', '#182433', '#2e1824', '#241833',
        '#182a2e', '#2e2a18', '#2e2018', '#0d2818', '#0a1a0a',
        '#1a0808', '#1a0a28', '#0a1a28', '#2a1208', '#0a0a28',
        '#0a1a14', '#1a1a3a',
      ]
      const c = colorBgs[source.colorTheme] || t.bg
      t = { ...t, bg: c, sidebar: c, panel: '#111214' }
    }
    root.style.setProperty('--app-bg', t.bg)
    root.style.setProperty('--app-sidebar', t.sidebar)
    root.style.setProperty('--app-panel', t.panel)
    root.style.setProperty('--app-text', t.text)
    root.style.setProperty('--app-muted', t.muted)
    root.style.setProperty('--app-input', t.input)
    document.body.style.background = t.panel
  }, [appliedTheme, draftTheme, themePreview])

  const saveLogin = (mail, pass, remember) => {
    if (remember) {
      localStorage.setItem('discord_login', JSON.stringify({
        email: mail,
        password: pass,
        rememberMe: true,
        autoLogin: false
      }))
    } else {
      localStorage.removeItem('discord_login')
    }
  }

  const saveProfile = (updates = {}) => {
    const data = {
      username: updates.username ?? username,
      bannerColor: updates.bannerColor ?? bannerColor,
      bannerImage: updates.bannerImage !== undefined ? updates.bannerImage : bannerImage,
      avatarStyle: updates.avatarStyle ?? avatarStyle,
      avatarImage: updates.avatarImage !== undefined ? updates.avatarImage : avatarImage,
      statusText: updates.statusText ?? statusText,
      bio: updates.bio ?? bio,
      pronouns: updates.pronouns ?? pronouns,
      frameId: updates.frameId ?? frameId,
      avatarDecoId: updates.avatarDecoId ?? avatarDecoId,
      nameFont: updates.nameFont ?? nameFont,
      nameEffect: updates.nameEffect ?? nameEffect,
      nameColor: updates.nameColor ?? nameColor,
      nameplateId: updates.nameplateId ?? nameplateId,
    }
    localStorage.setItem('discord_profile', JSON.stringify(data))
  }

  const openDecoModal = (type) => {
    setDecoModal(type)
    if (type === 'frame') setTempDeco(frameId)
    if (type === 'avatarDeco') setTempDeco(avatarDecoId)
    if (type === 'nameStyle') setTempDeco({ font: nameFont, effect: nameEffect, color: nameColor })
    if (type === 'nameplate') setTempDeco(nameplateId)
  }

  const applyDecoModal = () => {
    if (decoModal === 'frame') {
      setFrameId(tempDeco)
      saveProfile({ frameId: tempDeco })
    }
    if (decoModal === 'avatarDeco') {
      setAvatarDecoId(tempDeco)
      saveProfile({ avatarDecoId: tempDeco })
    }
    if (decoModal === 'nameStyle' && tempDeco) {
      setNameFont(tempDeco.font)
      setNameEffect(tempDeco.effect)
      setNameColor(tempDeco.color)
      saveProfile({ nameFont: tempDeco.font, nameEffect: tempDeco.effect, nameColor: tempDeco.color })
    }
    if (decoModal === 'nameplate') {
      setNameplateId(tempDeco)
      saveProfile({ nameplateId: tempDeco })
    }
    setDecoModal(null)
  }

  const getNameStyle = () => {
    const font = NAME_FONTS.find(f => f.id === nameFont) || NAME_FONTS[0]
    const style = { fontFamily: font.family, color: nameColor }
    if (nameEffect === 'gradient') {
      style.background = `linear-gradient(90deg, ${nameColor}, #fff)`
      style.WebkitBackgroundClip = 'text'
      style.WebkitTextFillColor = 'transparent'
      style.backgroundClip = 'text'
    }
    if (nameEffect === 'neon') {
      style.textShadow = `0 0 8px ${nameColor}, 0 0 16px ${nameColor}88`
    }
    if (nameEffect === 'pop') {
      style.textShadow = `2px 2px 0 ${nameColor}55`
      style.fontWeight = 800
    }
    return style
  }

  const allFrames = [...FRAMES.owned, ...FRAMES.shop]
  const allDecos = [...AVATAR_DECOS.owned, ...AVATAR_DECOS.shop]
  const allPlates = [...NAMEPLATES.owned, ...NAMEPLATES.shop]
  const currentFrame = allFrames.find(f => f.id === frameId) || FRAMES.owned[0]
  const currentAvatarDeco = allDecos.find(d => d.id === avatarDecoId) || AVATAR_DECOS.owned[0]
  const currentNameplate = allPlates.find(n => n.id === nameplateId) || NAMEPLATES.owned[0]

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setAvatarImage(reader.result)
      saveProfile({ avatarImage: reader.result })
    }
    reader.readAsDataURL(file)
  }

  const handleBannerUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setBannerImage(reader.result)
      saveProfile({ bannerImage: reader.result })
      setShowBannerPicker(false)
      setShowBannerMenu(false)
    }
    reader.readAsDataURL(file)
  }

  const applyBannerColor = (color) => {
    setBannerColor(color)
    setHexInput(color)
    setBannerImage(null)
    saveProfile({ bannerColor: color, bannerImage: null })
  }

  const handleHexChange = (val) => {
    setHexInput(val)
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      applyBannerColor(val)
    }
  }

  const validate = () => {
    const newErrors = { email: '', password: '', general: '' }
    let isValid = true
    if (!email.trim()) {
      newErrors.email = '⚠️ E-mail ou telefone é obrigatório, brother'
      isValid = false
    }
    if (!password.trim()) {
      newErrors.password = '⚠️ Senha é obrigatória, tenta de novo'
      isValid = false
    } else if (password === email) {
      newErrors.general = '❌ A senha não pode ser igual ao e-mail, né?'
      isValid = false
    }
    setErrors(newErrors)
    return isValid
  }

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem('discord_users') || '[]')
    } catch {
      return []
    }
  }

  const saveUser = (user) => {
    const users = getUsers().filter(
      (x) => x.username.toLowerCase() !== user.username.toLowerCase() && x.email.toLowerCase() !== user.email.toLowerCase()
    )
    users.push(user)
    localStorage.setItem('discord_users', JSON.stringify(users))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const users = getUsers()
    const loginId = email.trim().toLowerCase()
    const found = users.find(
      (u) =>
        u.username.toLowerCase() === loginId ||
        u.email.toLowerCase() === loginId ||
        (u.email.includes('@') && u.email.split('@')[0].toLowerCase() === loginId)
    )

    if (users.length > 0) {
      if (!found) {
        setErrors((prev) => ({ ...prev, email: 'Usuário não encontrado. Cria uma conta ou confere o nome.' }))
        return
      }
      if (found.password !== password) {
        setErrors((prev) => ({ ...prev, password: 'Senha incorreta.' }))
        return
      }
      setEmail(found.email)
      setUsername(found.username)
      saveProfile({ username: found.username })
      saveLogin(found.email, found.password, rememberMe)
    } else {
      // primeira conta / legado
      const name = email.includes('@') ? email.split('@')[0] : email.trim()
      saveUser({ username: name, email: email.trim(), password, birth: '' })
      setUsername(name)
      saveProfile({ username: name })
      saveLogin(email, password, rememberMe)
    }
    setShowSuccessModal(true)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    const errs = {}
    if (!regBirth) errs.birth = 'Informe a data de nascimento.'
    if (!regUser.trim() || !/^[a-zA-Z0-9._]{2,32}$/.test(regUser.trim())) {
      errs.user = 'Usuário inválido (letras, números, _ e .).'
    }
    if (!regPass || regPass.length < 4) errs.pass = 'Senha com pelo menos 4 caracteres.'
    if (regPass !== regPass2) errs.pass2 = 'As senhas não coincidem.'
    const users = getUsers()
    if (users.some((u) => u.username.toLowerCase() === regUser.trim().toLowerCase())) {
      errs.user = 'Esse usuário já existe.'
    }
    setRegErrors(errs)
    if (Object.keys(errs).length) return

    const mail = `${regUser.trim()}@local.app`
    saveUser({ username: regUser.trim(), email: mail, password: regPass, birth: regBirth })
    setEmail(mail)
    setPassword(regPass)
    setUsername(regUser.trim())
    saveProfile({ username: regUser.trim() })
    saveLogin(mail, regPass, true)
    setShowSuccessModal(true)
  }

  const handleGoogleLogin = () => {
    setShowGoogleModal(true)
  }

  const confirmGoogleLogin = (accountEmail) => {
    const mail = accountEmail || 'usuario.google@gmail.com'
    setEmail(mail)
    const pass = 'google-oauth'
    setPassword(pass)
    saveLogin(mail, pass, rememberMe)
    const name = mail.includes('@') ? mail.split('@')[0] : mail
    setUsername(name)
    saveProfile({ username: name })
    setShowGoogleModal(false)
    setShowSuccessModal(true)
  }

  const handleContinue = () => {
    setShowSuccessModal(false)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowSettings(false)
    setShowProfile(false)
    // Mantém salvos se rememberMe estiver ativo
    if (!rememberMe) {
      localStorage.removeItem('discord_login')
    } else {
      const saved = localStorage.getItem('discord_login')
      if (saved) {
        const data = JSON.parse(saved)
        data.autoLogin = false
        localStorage.setItem('discord_login', JSON.stringify(data))
      }
    }
  }

  const getDisplayName = () => {
    if (username.trim()) return username.trim()
    if (!email.trim()) return 'Usuário'
    if (email.includes('@')) return email.split('@')[0]
    return email.trim()
  }

  const displayName = getDisplayName()
  const avatarLetter = displayName.charAt(0).toUpperCase()
  const currentAvatar = AVATAR_STYLES.find(a => a.id === avatarStyle) || AVATAR_STYLES[0]

  const maskedEmail = email.includes('@')
    ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + '*'.repeat(Math.min(b.length, 8)) + c)
    : email

  // ========== TELA PÓS-LOGIN ==========
  if (isLoggedIn) {
    return (
      <div className={`discord-app theme-${appearance.theme}`}>
        {themePreview && (
          <div className="theme-preview-overlay">
            <div className="theme-preview-card">
              <h3>Pré-visualização do tema</h3>
              <p className="settings-hint">O app inteiro está usando este tema temporariamente. Se não gostar, volte.</p>
              <div className="theme-preview-sample" style={{ background: 'var(--app-bg)' }}>
                <div className="theme-preview-side" style={{ background: 'var(--app-sidebar)' }} />
                <div className="theme-preview-main">
                  <div className="theme-preview-bar" style={{ background: 'var(--app-panel)' }} />
                  <p style={{ color: 'var(--app-text)' }}>Assim fica o fundo do site.</p>
                  <p style={{ color: 'var(--app-muted)', fontSize: 13 }}>Só aplica de verdade se clicar em Aplicar.</p>
                </div>
              </div>
              <div className="mini-modal-footer">
                <button
                  className="settings-btn"
                  onClick={() => {
                    // volta pro tema aplicado antes
                    setDraftTheme(appliedTheme)
                    setThemePreview(false)
                  }}
                >
                  Voltar
                </button>
                <button
                  className="settings-btn primary"
                  onClick={() => {
                    setAppliedTheme(draftTheme)
                    setAppearance((prev) => ({ ...prev, theme: draftTheme.theme, colorTheme: draftTheme.colorTheme }))
                    try {
                      localStorage.setItem('discord_appearance', JSON.stringify({
                        ...appearance,
                        theme: draftTheme.theme,
                        colorTheme: draftTheme.colorTheme,
                      }))
                    } catch (_) {}
                    setThemePreview(false)
                  }}
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Sidebar servidores */}
        <div className="server-sidebar">
          <div className="server-icon home" title="Início">
            <FaDiscord size={28} />
          </div>
          <div className="server-divider" />
          <div className="server-icon" title="Adicionar servidor"><FaPlus /></div>
          <div className="server-icon" title="Explorar"><FaCompass /></div>
          <div className="server-divider" />
          <div className="server-icon" title="Baixar apps"><FaHeadset /></div>
        </div>

        {/* Sidebar canais */}
        <div className="channel-sidebar">
          <div className="search-bar">
            <FaSearch size={12} style={{ marginRight: 6 }} />
            Encontre ou comece uma conversa
          </div>

          <div className="nav-list">
            <div className="nav-item active">
              <span className="nav-icon"><FaUserFriends /></span>
              Amigos
            </div>
            <div className="nav-item">
              <span className="nav-icon"><FaGem size={18} /></span>
              Nitro
            </div>
            <div className="nav-item">
              <span className="nav-icon"><MdOutlineStorefront size={20} /></span>
              Loja
              <span className="badge">NOVO</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon"><HiOutlineSparkles size={20} /></span>
              Missões
              <span className="badge">NOVO</span>
            </div>
          </div>

          <div className="dm-section">
            <div className="dm-section-title">
              <span>Mensagens diretas</span>
              <span className="add-icon"><FaPlus size={14} /></span>
            </div>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div className="dm-placeholder" key={i}>
                <div className="avatar-placeholder" />
                <div className="name-placeholder" style={{ width: `${80 + (i % 3) * 20}px` }} />
              </div>
            ))}
          </div>

          {/* Painel do usuário */}
          <div className="user-panel">
            <div
              className="user-avatar"
              style={avatarImage ? { cursor: 'pointer', background: 'transparent', overflow: 'hidden' } : { background: currentAvatar.bg, cursor: 'pointer' }}
              onClick={() => setShowProfile(true)}
              title="Ver perfil"
            >
              {avatarImage ? <img src={avatarImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : avatarLetter}
              <span className="status-dot" />
            </div>
            <div className="user-info" onClick={() => setShowProfile(true)} style={{ cursor: 'pointer' }}>
              <div className="username">{displayName}</div>
              <div className="status">{statusText}</div>
            </div>
            <div className="user-controls">
              <button title="Silenciar"><FaMicrophone size={16} /></button>
              <button title="Ensurdecer"><FaHeadphones size={16} /></button>
              <button title="Configurações do usuário" onClick={() => setShowSettings(true)}>
                <FaCog size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Área principal */}
        <div className="main-content">
          <div className="main-header">
            <FaUserFriends className="header-icon" />
            <span className="header-title">Amigos</span>
            <div className="tabs">
              <div className="tab">Online</div>
              <div className="tab">Todos</div>
              <div className="tab">Pendente</div>
              <div className="tab">Bloqueado</div>
              <div className="tab active">Adicionar amigo</div>
            </div>
            <div className="header-actions">
              <span title="Nova mensagem em grupo"><FaPlus /></span>
              <span title="Caixa de entrada"><FaInbox /></span>
              <span title="Ajuda"><FaQuestionCircle /></span>
            </div>
          </div>

          <div className="content-area">
            <div className="friends-content">
              <div className="add-friend-section">
                <div className="add-friend-text">
                  <h2>Adicionar amigo</h2>
                  <p className="description">
                    Você pode adicionar amigos com o nome de usuário Discord deles.
                  </p>
                  <div className="add-friend-form">
                    <input
                      type="text"
                      placeholder="Insira um nome de usuário"
                      value={friendUsername}
                      onChange={(e) => setFriendUsername(e.target.value)}
                    />
                    <button disabled={!friendUsername.trim()}>
                      Enviar pedido de amizade
                    </button>
                  </div>
                </div>
                <div className="friend-illustration" aria-hidden="true">
                  <img
                    src="/AraraIcon.png"
                    alt=""
                    className="arara-mascot"
                  />
                </div>
              </div>

              <div className="other-places">
                <h3>Outros lugares para fazer amigos</h3>
                <p>
                  Ninguém vem à cabeça? Confira nossa lista de servidores públicos — tem de tudo: jogos, culinária, música, anime e muito mais. Bora socializar!
                </p>
                <button className="explore-btn">
                  <div className="icon-box"><FaCompass /></div>
                  <span>Explorar Servidores Públicos</span>
                  <FaChevronRight className="arrow" />
                </button>
              </div>
            </div>

            <div className="active-now-panel">
              <h3>Ativo agora</h3>
              <div className="active-empty">
                <h4>Por enquanto, está quieto...</h4>
                <p>
                  Quando um(a) amigo(a) começa uma atividade, como jogar um jogo ou bater papo por voz, mostraremos aqui!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========== MODAL CONFIGURAÇÕES ========== */}
        {showSettings && (
          <div className="settings-overlay">
            <div className="settings-modal">
              <div className="settings-sidebar">
                <div className="settings-user">
                  <div className="settings-user-avatar" style={avatarImage ? { background: 'transparent', overflow: 'hidden' } : { background: currentAvatar.bg }}>
                    {avatarImage ? <img src={avatarImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : avatarLetter}
                  </div>
                  <div>
                    <div className="settings-user-name">{displayName}</div>
                    <button className="edit-profiles-btn" onClick={() => { setShowSettings(false); setShowProfile(true) }}>
                      Editar perfis <FaPen size={10} />
                    </button>
                  </div>
                </div>

                <div className="settings-search">
                  <FaSearch size={12} />
                  <span>Buscar</span>
                </div>

                <div className="settings-nav">
                  <div className="settings-nav-label">Conta do usuário</div>
                  <div
                    className={`settings-nav-item ${settingsTab === 'conta' ? 'active' : ''}`}
                    onClick={() => { setSettingsTab('conta'); setSettingsSub('info') }}
                  >
                    <FaUser size={16} /> Conta
                  </div>
                  {settingsTab === 'conta' && (
                    <div className="settings-subnav">
                      <div className={`settings-subnav-item ${settingsSub === 'info' ? 'active' : ''}`} onClick={() => setSettingsSub('info')}>Informações da conta</div>
                      <div className={`settings-subnav-item ${settingsSub === 'senha' ? 'active' : ''}`} onClick={() => setSettingsSub('senha')}>Senha e segurança</div>
                      <div className={`settings-subnav-item ${settingsSub === 'status' ? 'active' : ''}`} onClick={() => setSettingsSub('status')}>Status da Conta</div>
                      <div className={`settings-subnav-item ${settingsSub === 'familia' ? 'active' : ''}`} onClick={() => setSettingsSub('familia')}>Central da Família</div>
                    </div>
                  )}

                  <div
                    className={`settings-nav-item ${settingsTab === 'privacidade' ? 'active' : ''}`}
                    onClick={() => { setSettingsTab('privacidade'); setSettingsSub('dados') }}
                  >
                    <MdOutlinePrivacyTip size={18} /> Dados e privacidade
                  </div>
                  {settingsTab === 'privacidade' && (
                    <div className="settings-subnav">
                      <div className={`settings-subnav-item ${settingsSub === 'dados' ? 'active' : ''}`} onClick={() => setSettingsSub('dados')}>Como o Discord usa meus dados</div>
                      <div className={`settings-subnav-item ${settingsSub === 'privacidade-perfil' ? 'active' : ''}`} onClick={() => setSettingsSub('privacidade-perfil')}>Privacidade do perfil</div>
                    </div>
                  )}

                  <div
                    className={`settings-nav-item ${settingsTab === 'permissoes' ? 'active' : ''}`}
                    onClick={() => { setSettingsTab('permissoes'); setSettingsSub('filtros-conteudo') }}
                  >
                    <FaCommentDots size={16} /> Permissões de mensagens
                  </div>
                  {settingsTab === 'permissoes' && (
                    <div className="settings-subnav">
                      <div className={`settings-subnav-item ${settingsSub === 'filtros-conteudo' ? 'active' : ''}`} onClick={() => setSettingsSub('filtros-conteudo')}>Filtros de conteúdo</div>
                      <div className={`settings-subnav-item ${settingsSub === 'filtros-spam' ? 'active' : ''}`} onClick={() => setSettingsSub('filtros-spam')}>Filtros de spam</div>
                      <div className={`settings-subnav-item ${settingsSub === 'mensagens-diretas' ? 'active' : ''}`} onClick={() => setSettingsSub('mensagens-diretas')}>Mensagens diretas</div>
                      <div className={`settings-subnav-item ${settingsSub === 'pedidos-amizade' ? 'active' : ''}`} onClick={() => setSettingsSub('pedidos-amizade')}>Pedidos de amizade</div>
                      <div className={`settings-subnav-item ${settingsSub === 'jogos-conectados' ? 'active' : ''}`} onClick={() => setSettingsSub('jogos-conectados')}>Jogos conectados</div>
                      <div className={`settings-subnav-item ${settingsSub === 'ignorar-bloquear' ? 'active' : ''}`} onClick={() => setSettingsSub('ignorar-bloquear')}>Ignorar e bloquear</div>
                    </div>
                  )}
                  <div className="settings-nav-item" onClick={() => setSettingsTab('notificacoes')}>
                    <FaBell size={16} /> Notificações
                  </div>
                  <div className="settings-nav-item" onClick={() => setSettingsTab('cobranca')}>
                    <FaCreditCard size={16} /> Cobrança
                  </div>

                  <div className="settings-nav-label">Experiência</div>
                  <div className={`settings-nav-item ${settingsTab === 'voz' ? 'active' : ''}`} onClick={() => setSettingsTab('voz')}>
                    <FaHeadset size={16} /> Voz e vídeo
                  </div>
                  <div
                    className={`settings-nav-item ${settingsTab === 'aparencia' ? 'active' : ''}`}
                    onClick={() => {
                      setSettingsTab('aparencia')
                      setSettingsSub('tema')
                      setDraftTheme({ ...appliedTheme })
                    }}
                  >
                    <HiOutlineSparkles size={16} /> Aparência <span className="badge">NOVO</span>
                  </div>
                  {settingsTab === 'aparencia' && (
                    <div className="settings-subnav">
                      <div className={`settings-subnav-item ${settingsSub === 'tema' ? 'active' : ''}`} onClick={() => setSettingsSub('tema')}>Tema</div>
                      <div className={`settings-subnav-item ${settingsSub === 'icone-app' ? 'active' : ''}`} onClick={() => setSettingsSub('icone-app')}>Ícone do aplicativo</div>
                      <div className={`settings-subnav-item ${settingsSub === 'mensagens-aparencia' ? 'active' : ''}`} onClick={() => setSettingsSub('mensagens-aparencia')}>Mensagens</div>
                      <div className={`settings-subnav-item ${settingsSub === 'caixa-chat' ? 'active' : ''}`} onClick={() => setSettingsSub('caixa-chat')}>Caixa de chat</div>
                      <div className={`settings-subnav-item ${settingsSub === 'buscar' ? 'active' : ''}`} onClick={() => setSettingsSub('buscar')}>Buscar</div>
                      <div className={`settings-subnav-item ${settingsSub === 'streamer' ? 'active' : ''}`} onClick={() => setSettingsSub('streamer')}>Modo streamer</div>
                    </div>
                  )}
                  <div className={`settings-nav-item ${settingsTab === 'acessibilidade' ? 'active' : ''}`} onClick={() => setSettingsTab('acessibilidade')}>
                    <FaUser size={16} /> Acessibilidade
                  </div>
                  <div className={`settings-nav-item ${settingsTab === 'sistema' ? 'active' : ''}`} onClick={() => setSettingsTab('sistema')}>
                    <FaCog size={16} /> Sistema
                  </div>
                  <div className={`settings-nav-item ${settingsTab === 'idioma' ? 'active' : ''}`} onClick={() => setSettingsTab('idioma')}>
                    <FaBell size={16} /> Idioma e Horário
                  </div>

                  <div className="settings-nav-label">Jogos e apps</div>
                  <div className={`settings-nav-item ${settingsTab === 'atividades' ? 'active' : ''}`} onClick={() => setSettingsTab('atividades')}>
                    <FaGem size={16} /> Privacidade nas atividades
                  </div>
                  <div className={`settings-nav-item ${settingsTab === 'apps' ? 'active' : ''}`} onClick={() => setSettingsTab('apps')}>
                    <MdOutlineStorefront size={16} /> Apps conectados
                  </div>
                  <div className={`settings-nav-item ${settingsTab === 'dev' ? 'active' : ''}`} onClick={() => setSettingsTab('dev')}>
                    <FaPen size={16} /> Desenvolvedor
                  </div>
                </div>

                <div className="settings-logout">
                  <button onClick={handleLogout}>Sair</button>
                </div>
              </div>

              <div className="settings-content">
                <div className="settings-header">
                  <h2>
                    {settingsTab === 'conta' && 'Conta'}
                    {settingsTab === 'privacidade' && 'Dados e privacidade'}
                    {settingsTab === 'permissoes' && 'Permissões de mensagens'}
                    {settingsTab === 'notificacoes' && 'Notificações'}
                    {settingsTab === 'cobranca' && 'Cobrança'}
                    {settingsTab === 'voz' && 'Voz e vídeo'}
                    {settingsTab === 'aparencia' && 'Aparência'}
                    {settingsTab === 'acessibilidade' && 'Acessibilidade'}
                    {settingsTab === 'sistema' && 'Sistema'}
                    {settingsTab === 'idioma' && 'Idioma e Horário'}
                    {settingsTab === 'atividades' && 'Privacidade nas atividades'}
                    {settingsTab === 'apps' && 'Apps conectados'}
                    {settingsTab === 'dev' && 'Desenvolvedor'}
                  </h2>
                  <button className="settings-close" onClick={() => setShowSettings(false)}>
                    <FaTimes />
                  </button>
                </div>

                <div className="settings-body">
                  {/* ---- CONTA / INFO ---- */}
                  {settingsTab === 'conta' && settingsSub === 'info' && (
                    <>
                      <h3>Informações da conta</h3>
                      <div className="settings-row">
                        <span className="settings-label">Nome de usuário</span>
                        <span className="settings-value">{displayName}</span>
                        <button
                          className="settings-btn"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setNewUsername(displayName)
                            setUsernameError('')
                            setShowUsernameModal(true)
                          }}
                        >
                          Editar
                        </button>
                      </div>
                      <div className="settings-row">
                        <span className="settings-label">E-mail</span>
                        <span className="settings-value">
                          {showEmail ? email : maskedEmail}
                          <button className="link-btn" onClick={() => setShowEmail(!showEmail)}>
                            {showEmail ? 'Ocultar' : 'Mostrar'}
                          </button>
                        </span>
                        <button className="settings-btn">Editar</button>
                      </div>
                      <div className="settings-row">
                        <span className="settings-label">Telefone</span>
                        <span className="settings-value muted">Você ainda não adicionou um telefone.</span>
                        <button className="settings-btn">Adicionar</button>
                      </div>
                      <div className="settings-row">
                        <span className="settings-label">Grupo Etário</span>
                        <span className="settings-value muted">Não confirmado</span>
                        <button className="settings-btn primary">Confirmar</button>
                      </div>
                    </>
                  )}

                  {settingsTab === 'conta' && settingsSub === 'senha' && (
                    <>
                      <h3>Senha e segurança</h3>
                      {!showPasswordForm ? (
                        <div className="settings-row">
                          <span className="settings-label">Senha</span>
                          <span className="settings-value" />
                          <button
                            className="settings-btn"
                            onClick={() => {
                              setShowPasswordForm(true)
                              setNewPassword('')
                              setConfirmNewPassword('')
                              setPasswordError('')
                            }}
                          >
                            Editar
                          </button>
                        </div>
                      ) : (
                        <div className="password-change-box">
                          <label className="mini-label">Nova senha</label>
                          <input
                            type="password"
                            className="mini-input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Nova senha"
                          />
                          <label className="mini-label">Confirmar senha</label>
                          <input
                            type="password"
                            className="mini-input"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            placeholder="Confirmar senha"
                          />
                          {passwordError && <p className="mini-error">{passwordError}</p>}
                          <div className="mini-modal-footer" style={{ justifyContent: 'flex-start' }}>
                            <button
                              className="settings-btn primary"
                              onClick={() => {
                                if (!newPassword || newPassword.length < 4) {
                                  setPasswordError('A senha precisa ter pelo menos 4 caracteres.')
                                  return
                                }
                                if (newPassword !== confirmNewPassword) {
                                  setPasswordError('As senhas não coincidem.')
                                  return
                                }
                                setPassword(newPassword)
                                saveLogin(email, newPassword, rememberMe)
                                setShowPasswordForm(false)
                                setPasswordError('')
                              }}
                            >
                              Salvar
                            </button>
                            <button className="settings-btn" onClick={() => setShowPasswordForm(false)}>Cancelar</button>
                          </div>
                        </div>
                      )}
                      <div className="settings-row clickable-row">
                        <span className="settings-label">Autenticação Multifatorial</span>
                        <span className="settings-value muted" style={{ textAlign: 'right' }}>Definir ›</span>
                      </div>
                      <div className="settings-row clickable-row">
                        <span className="settings-label">Dispositivos conectados</span>
                        <span className="settings-value muted" style={{ textAlign: 'right' }}>1 dispositivo ›</span>
                      </div>
                    </>
                  )}

                  {settingsTab === 'conta' && settingsSub === 'status' && (
                    <>
                      <h3>Status da Conta</h3>
                      <div className="status-banner ok">
                        <span className="status-check">✓</span>
                        <div>
                          <strong>Sua conta está toda em ordem</strong>
                          <p>
                            Obrigado por respeitar os <span className="link-btn">Termos de Serviço</span> do Discord e as <span className="link-btn">diretrizes da comunidade</span>. Se você infringir as regras, isso será exibido aqui.
                          </p>
                        </div>
                        <span className="status-arrow">›</span>
                      </div>
                    </>
                  )}

                  {settingsTab === 'conta' && settingsSub === 'familia' && (
                    <>
                      <h3>Central da Família</h3>
                      <div className="settings-row clickable-row" style={{ alignItems: 'flex-start', paddingTop: 8 }}>
                        <div style={{ flex: 1 }}>
                          <div className="privacy-title">Configurar Central da Família</div>
                          <p className="privacy-desc">
                            Conecte-se com um responsável para que ele possa ficar por dentro. Suas mensagens permanecem privadas e você sempre poderá saber exatamente o que ele vê.
                          </p>
                        </div>
                        <span className="settings-value muted">›</span>
                      </div>
                      <div className="settings-divider" />
                      <div className="settings-row">
                        <div style={{ flex: 1 }}>
                          <div className="privacy-title">Desative sua conta</div>
                          <p className="privacy-desc">Desative temporariamente sua conta.</p>
                        </div>
                        <button className="settings-btn">Desativar conta</button>
                      </div>
                      <div className="settings-row">
                        <div style={{ flex: 1 }}>
                          <div className="privacy-title">Encerrar sua conta</div>
                          <p className="privacy-desc">Encerre sua conta permanentemente.</p>
                        </div>
                        <button className="settings-btn danger-btn">Excluir conta</button>
                      </div>
                    </>
                  )}

                  {/* ---- DADOS E PRIVACIDADE ---- */}
                  {settingsTab === 'privacidade' && settingsSub === 'dados' && (
                    <>
                      <h3>Como o Discord usa meus dados</h3>

                      <div className="privacy-block">
                        <div className="privacy-title">Utilizar dados para fazer o Discord funcionar</div>
                        <p className="privacy-desc">
                          O Discord precisa armazenar e processar alguns dados para te fornecer os serviços básicos do Discord, tais como suas mensagens, servidores em que você está e mensagens diretas. Ao usar o Discord, você permite que o Discord forneça estes serviços básicos. Você pode interromper isso ao <span className="link-btn">desativar</span> ou <span className="link-btn">excluir</span> sua conta.
                        </p>
                      </div>

                      <div className="privacy-row">
                        <div>
                          <div className="privacy-title">Utilizar dados para melhorar o Discord</div>
                          <p className="privacy-desc">Permite que o Discord use e processe minhas informações para entender e aprimorar seus serviços. <span className="link-btn">Saiba mais</span></p>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" checked={privacy.improveDiscord} onChange={(e) => setPrivacy({ ...privacy, improveDiscord: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>

                      <div className="privacy-row">
                        <div>
                          <div className="privacy-title">Utilizar dados para personalizar minha experiência no Discord</div>
                          <p className="privacy-desc">Permite que o Discord utilize informações, como com quem você conversa ou os jogos que joga, para personalizar o Discord para você. <span className="link-btn">Saiba mais</span></p>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" checked={privacy.personalize} onChange={(e) => setPrivacy({ ...privacy, personalize: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>

                      <div className="privacy-row">
                        <div>
                          <div className="privacy-title">Usar minha atividade do Discord para personalizar o conteúdo patrocinado</div>
                          <p className="privacy-desc">Permite que o Discord personalize o conteúdo patrocinado, como missões, usando sua atividade no Discord. <span className="link-btn">Saiba mais</span></p>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" checked={privacy.sponsored} onChange={(e) => setPrivacy({ ...privacy, sponsored: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>

                      <div className="privacy-row">
                        <div>
                          <div className="privacy-title">Permitir que minha voz seja gravada nos clipes</div>
                          <p className="privacy-desc">Permite que sua voz seja incluída quando alguém no mesmo canal de voz usa clipes.</p>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" checked={privacy.voiceClips} onChange={(e) => setPrivacy({ ...privacy, voiceClips: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>

                      <div className="privacy-row">
                        <div>
                          <div className="privacy-title">Solicitar meus dados</div>
                          <p className="privacy-desc">Se você precisar de uma cópia dos seus dados pessoais de todo o histórico da sua conta, poderá obtê-la aqui. <span className="link-btn">Saiba mais</span></p>
                        </div>
                        <button className="settings-btn">Solicitar dados</button>
                      </div>
                    </>
                  )}

                  {settingsTab === 'privacidade' && settingsSub === 'privacidade-perfil' && (
                    <>
                      <h3>Privacidade do perfil</h3>
                      <p className="settings-hint">Controle quem pode ver suas informações de perfil — como sua bio e contas conectadas. <span className="link-btn">Saiba mais</span></p>

                      <div className="privacy-title" style={{ marginTop: 20 }}>Compartilhe meu perfil completo com</div>

                      <label className="radio-row">
                        <input type="radio" name="profileShare" checked={privacy.profileShare === 'everyone'} onChange={() => setPrivacy({ ...privacy, profileShare: 'everyone' })} />
                        <div>
                          <strong>Amigos e todos os servidores</strong>
                          <p>Seu perfil completo é visível para amigos e para qualquer servidor em que você estiver.</p>
                        </div>
                      </label>
                      <label className="radio-row">
                        <input type="radio" name="profileShare" checked={privacy.profileShare === 'small'} onChange={() => setPrivacy({ ...privacy, profileShare: 'small' })} />
                        <div>
                          <strong>Amigos e servidores pequenos apenas</strong>
                          <p>Seu perfil completo é visível para amigos e para qualquer servidor em que você estiver com 200 membros ou menos. Todos os outros veem uma versão limitada.</p>
                        </div>
                      </label>
                      <label className="radio-row">
                        <input type="radio" name="profileShare" checked={privacy.profileShare === 'friends'} onChange={() => setPrivacy({ ...privacy, profileShare: 'friends' })} />
                        <div>
                          <strong>Apenas amigos</strong>
                          <p>Seu perfil completo é visível apenas para amigos. O restante vê uma versão limitada.</p>
                        </div>
                      </label>

                      <div className="privacy-row" style={{ marginTop: 16 }}>
                        <div>
                          <div className="privacy-title">Compartilhar quando eu atualizar meu perfil</div>
                          <p className="privacy-desc">Permita que seus amigos recebam uma notificação quando você atualizar o seu perfil.</p>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" checked={privacy.notifyProfileUpdate} onChange={(e) => setPrivacy({ ...privacy, notifyProfileUpdate: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                    </>
                  )}

                  {/* ---- PERMISSÕES DE MENSAGENS ---- */}
                  {settingsTab === 'permissoes' && settingsSub === 'filtros-conteudo' && (
                    <>
                      <h3>Filtros de conteúdo sensível</h3>
                      <p className="settings-hint">
                        Escolha como você quer visualizar imagens detectadas pelos filtros de conteúdo sensível do Discord. <span className="link-btn">Saiba mais</span>
                      </p>

                      <div className="content-filter-layout">
                        <div className="content-filter-tabs">
                          <div className="content-filter-tab active">Conteúdo sexual maduro</div>
                          <div className="content-filter-tab">Mídia gráfica</div>
                        </div>
                        <div className="content-filter-options">
                          <div className="filter-option-row">
                            <span>Mensagens diretas de amigos</span>
                            <select
                              className="filter-select"
                              value={msgPerms.matureFriends}
                              onChange={(e) => setMsgPerms({ ...msgPerms, matureFriends: e.target.value })}
                            >
                              <option value="blur">Borrar</option>
                              <option value="block">Bloquear</option>
                              <option value="show">Mostrar</option>
                            </select>
                          </div>
                          <div className="filter-option-row">
                            <span>Mensagens diretas de outras pessoas</span>
                            <select
                              className="filter-select"
                              value={msgPerms.matureOthers}
                              onChange={(e) => setMsgPerms({ ...msgPerms, matureOthers: e.target.value })}
                            >
                              <option value="blur">Borrar</option>
                              <option value="block">Bloquear</option>
                              <option value="show">Mostrar</option>
                            </select>
                          </div>
                          <div className="filter-option-row">
                            <span>Mensagens em canais do servidor</span>
                            <select
                              className="filter-select"
                              value={msgPerms.matureServer}
                              onChange={(e) => setMsgPerms({ ...msgPerms, matureServer: e.target.value })}
                            >
                              <option value="blur">Borrar</option>
                              <option value="block">Bloquear</option>
                              <option value="show">Mostrar</option>
                            </select>
                          </div>
                          <p className="privacy-desc" style={{ marginTop: 8 }}>
                            Ajuda a detectar imagens que podem conter material sexualmente explícito ou sugestivo envolvendo adultos.
                          </p>
                        </div>
                      </div>

                      <div className="privacy-row">
                        <div>
                          <div className="privacy-title">Permite acesso a comandos com restrição de idade de apps em mensagens diretas</div>
                          <p className="privacy-desc">Permite que pessoas com 18 anos ou mais acessem comandos marcados como restritos por idade nas mensagens diretas. Aplica-se a todos os apps.</p>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" checked={msgPerms.ageAppCommands} onChange={(e) => setMsgPerms({ ...msgPerms, ageAppCommands: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div>
                          <div className="privacy-title">Permitir acesso a servidores com restrição de idade no iOS</div>
                          <p className="privacy-desc">Permite acessar servidores com restrição de idade no iOS.</p>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" checked={msgPerms.ageServersIOS} onChange={(e) => setMsgPerms({ ...msgPerms, ageServersIOS: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>

                      <p className="settings-nav-label" style={{ paddingLeft: 0, marginTop: 20 }}>Configurações relacionadas</p>
                      <div className="related-card" onClick={() => setSettingsTab('aparencia')}>
                        <span className="related-icon">🎨</span>
                        <div>
                          <strong>Aparência</strong>
                          <p>Mostrar/ocultar mídia no chat e conteúdo de spoiler</p>
                        </div>
                        <span className="status-arrow">›</span>
                      </div>
                    </>
                  )}

                  {settingsTab === 'permissoes' && settingsSub === 'filtros-spam' && (
                    <>
                      <h3>Filtros de spam</h3>
                      <div className="privacy-title" style={{ marginTop: 8 }}>Filtrar automaticamente mensagens de spam suspeitas</div>
                      <p className="privacy-desc">
                        O Discord pode filtrar algumas mensagens que contêm spam. Essas mensagens vão para a sua caixa de envio de spam.
                      </p>
                      <label className="radio-row">
                        <input type="radio" name="spam" checked={msgPerms.spamFilter === 'all'} onChange={() => setMsgPerms({ ...msgPerms, spamFilter: 'all' })} />
                        <div><strong>Filtrar todos os envios de spam</strong></div>
                      </label>
                      <label className="radio-row">
                        <input type="radio" name="spam" checked={msgPerms.spamFilter === 'unknown'} onChange={() => setMsgPerms({ ...msgPerms, spamFilter: 'unknown' })} />
                        <div><strong>Filtrar mensagens de desconhecidos</strong> <span className="muted">(recomendado)</span></div>
                      </label>
                      <label className="radio-row">
                        <input type="radio" name="spam" checked={msgPerms.spamFilter === 'none'} onChange={() => setMsgPerms({ ...msgPerms, spamFilter: 'none' })} />
                        <div><strong>Não filtrar envios de spam</strong></div>
                      </label>
                    </>
                  )}

                  {settingsTab === 'permissoes' && settingsSub === 'mensagens-diretas' && (
                    <>
                      <h3>Permissões de mensagens diretas (DM)</h3>
                      <div className="server-select-fake">
                        <FaDiscord size={18} color="#5865f2" />
                        <span>Todos os servidores</span>
                        <span className="status-arrow">▾</span>
                      </div>
                      <div className="privacy-row">
                        <div>
                          <div className="privacy-title">Permitir DMs de outros membros dos meus servidores</div>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" checked={msgPerms.dmServerMembers} onChange={(e) => setMsgPerms({ ...msgPerms, dmServerMembers: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div>
                          <div className="privacy-title">Filtrar mensagens de membros do servidor que você talvez não conheça</div>
                          <p className="privacy-desc"><span className="link-btn">Saiba mais</span></p>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" checked={msgPerms.filterUnknownMembers} onChange={(e) => setMsgPerms({ ...msgPerms, filterUnknownMembers: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                    </>
                  )}

                  {settingsTab === 'permissoes' && settingsSub === 'pedidos-amizade' && (
                    <>
                      <h3>Permissões de pedido de amizade</h3>
                      <div className="privacy-title" style={{ marginTop: 8 }}>Permitir pedidos de amizade de...</div>
                      <div className="privacy-row">
                        <div className="privacy-title">Todos</div>
                        <label className="toggle">
                          <input type="checkbox" checked={msgPerms.friendEveryone} onChange={(e) => setMsgPerms({ ...msgPerms, friendEveryone: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Amigos de amigos</div>
                        <label className="toggle">
                          <input type="checkbox" checked={msgPerms.friendFoF} onChange={(e) => setMsgPerms({ ...msgPerms, friendFoF: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div>
                          <div className="privacy-title">Membros do servidor</div>
                          <p className="privacy-desc">Membros do servidor só podem enviar pedidos de amizade de servidores onde você também aceita mensagens diretas.</p>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" checked={msgPerms.friendServer} onChange={(e) => setMsgPerms({ ...msgPerms, friendServer: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                    </>
                  )}

                  {settingsTab === 'permissoes' && settingsSub === 'jogos-conectados' && (
                    <>
                      <h3>Mensagens em jogos conectados</h3>
                      <p className="settings-hint">Estas são as configurações para jogos que usam o Discord para impulsionar atividades sociais.</p>
                      <div className="empty-box">
                        <strong>NENHUM JOGO CONECTADO</strong>
                        <p>Quer conectar um jogo à sua conta? <span className="link-btn">Saiba mais</span></p>
                      </div>
                      <p className="settings-nav-label" style={{ paddingLeft: 0, marginTop: 20 }}>Configurações relacionadas</p>
                      <div className="related-card">
                        <span className="related-icon">🔗</span>
                        <div>
                          <strong>Aplicativos autorizados</strong>
                          <p>Gerencie seus jogos em Aplicativos Autorizados</p>
                        </div>
                        <span className="status-arrow">›</span>
                      </div>
                    </>
                  )}

                  {settingsTab === 'permissoes' && settingsSub === 'ignorar-bloquear' && (
                    <>
                      <h3>Ignorar e bloquear</h3>
                      <p className="settings-hint">
                        Você está no controle. Para comparar suas opções para reduzir interações indesejadas, <span className="link-btn">explore nosso guia de recursos</span>
                      </p>
                      <div className="ignored-card">
                        <div className="ignored-header">
                          <span>🚫</span>
                          <div>
                            <strong>Contas ignoradas</strong>
                            <p>0 contas</p>
                          </div>
                        </div>
                        <div className="empty-box" style={{ marginTop: 8, padding: '20px' }}>
                          <p>Nenhuma conta ignorada.</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ---- APARÊNCIA ---- */}
                  {settingsTab === 'aparencia' && settingsSub === 'tema' && (
                    <>
                      <h3>Tema</h3>
                      <p className="privacy-title" style={{ marginTop: 12 }}>Temas padrão</p>
                      <div className="theme-swatches">
                        {[
                          { id: 'light', bg: '#ffffff', border: '#e3e5e8' },
                          { id: 'ash', bg: '#4e5058' },
                          { id: 'dark', bg: '#313338' },
                          { id: 'midnight', bg: '#000000' },
                          { id: 'auto', bg: 'linear-gradient(135deg,#fff 50%,#000 50%)' },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            className={`theme-swatch ${draftTheme.theme === t.id && draftTheme.colorTheme == null ? 'selected' : ''}`}
                            style={{ background: t.bg, borderColor: t.border || 'transparent' }}
                            onClick={() => setDraftTheme({ theme: t.id, colorTheme: null })}
                          >
                            {draftTheme.theme === t.id && draftTheme.colorTheme == null && <span className="theme-check">✓</span>}
                            {t.id === 'auto' && <span className="theme-auto">⇄</span>}
                          </button>
                        ))}
                      </div>

                      <div className="nitro-banner free-banner">
                        <div className="nitro-banner-icon">🎨</div>
                        <div>
                          <strong>Deixe o Discord do seu jeitinho</strong>
                          <p>Crie seu próprio tema personalizado. <span className="free-tag">Grátis aqui!</span></p>
                        </div>
                        <button className="settings-btn primary">Experimentar</button>
                      </div>

                      <div className="color-themes-block">
                        <div className="color-themes-header">
                          <div>
                            <strong>Temas coloridos</strong>
                            <p className="privacy-desc">Todos liberados — sem Nitro.</p>
                          </div>
                          <div className="color-themes-actions">
                            <button
                              className="settings-btn"
                              type="button"
                              onClick={() => {
                                setDraftTheme({
                                  theme: draftTheme.theme || appliedTheme.theme,
                                  colorTheme: draftTheme.colorTheme ?? appliedTheme.colorTheme,
                                })
                                setShowSettings(false)
                                setThemePreview(true)
                              }}
                            >
                              Pré-visualizar tema
                            </button>
                            <button
                              className="settings-btn primary"
                              type="button"
                              onClick={() => {
                                setAppliedTheme(draftTheme)
                                setAppearance((prev) => ({
                                  ...prev,
                                  theme: draftTheme.theme,
                                  colorTheme: draftTheme.colorTheme,
                                }))
                                try {
                                  localStorage.setItem('discord_appearance', JSON.stringify({
                                    ...appearance,
                                    theme: draftTheme.theme,
                                    colorTheme: draftTheme.colorTheme,
                                  }))
                                } catch (_) {}
                              }}
                            >
                              Usar tema
                            </button>
                          </div>
                        </div>
                        <div className="color-theme-grid">
                          {[
                            'linear-gradient(135deg,#c8f7c5,#e8f5e9)',
                            'linear-gradient(135deg,#ffe0b2,#fff3e0)',
                            'linear-gradient(135deg,#bbdefb,#e3f2fd)',
                            'linear-gradient(135deg,#f8bbd0,#fce4ec)',
                            'linear-gradient(135deg,#d1c4e9,#ede7f6)',
                            'linear-gradient(135deg,#b2ebf2,#e0f7fa)',
                            'linear-gradient(135deg,#fff9c4,#fffde7)',
                            'linear-gradient(135deg,#ffccbc,#fbe9e7)',
                            'linear-gradient(135deg,#009b3a,#fedf00)',
                            'linear-gradient(135deg,#1b5e20,#33691e)',
                            'linear-gradient(135deg,#b71c1c,#3e2723)',
                            'linear-gradient(135deg,#4a148c,#311b92)',
                            'linear-gradient(135deg,#01579b,#006064)',
                            'linear-gradient(135deg,#e65100,#bf360c)',
                            'linear-gradient(135deg,#1a237e,#0d47a1)',
                            'linear-gradient(135deg,#004d40,#1b5e20)',
                            'linear-gradient(135deg,#5865f2,#7c3aed)',
                          ].map((bg, i) => (
                            <button
                              key={i}
                              type="button"
                              className={`color-theme-swatch ${draftTheme.colorTheme === i ? 'selected' : ''}`}
                              style={{ background: bg }}
                              onClick={() => setDraftTheme((d) => ({ ...d, colorTheme: i }))}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="privacy-row">
                        <div className="privacy-title">Sincronizar tema em meus dispositivos</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.syncDevices} onChange={(e) => setAppearance({ ...appearance, syncDevices: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Aplicar tema aos perfis de outros usuários</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.applyToProfiles} onChange={(e) => setAppearance({ ...appearance, applyToProfiles: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Tema padrão nos servidores</div>
                        <select
                          className="filter-select"
                          value={appearance.serverTheme}
                          onChange={(e) => setAppearance({ ...appearance, serverTheme: e.target.value })}
                        >
                          <option value="server">Usar o tema do servidor</option>
                          <option value="mine">Usar meu tema</option>
                        </select>
                      </div>
                      <p className="settings-nav-label" style={{ paddingLeft: 0, marginTop: 16 }}>Configurações relacionadas</p>
                      <div className="related-card" onClick={() => setSettingsTab('acessibilidade')}>
                        <span className="related-icon">♿</span>
                        <div>
                          <strong>Acessibilidade</strong>
                          <p>Altere a saturação de cores, habilite modos de alto contraste e muito mais</p>
                        </div>
                        <span className="status-arrow">›</span>
                      </div>
                    </>
                  )}

                  {settingsTab === 'aparencia' && settingsSub === 'icone-app' && (
                    <>
                      <h3>Ícone do aplicativo</h3>
                      <p className="settings-hint">Altere o ícone no app. <span className="free-tag">Grátis — sem Nitro.</span></p>
                      <div className="app-icon-grid">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`app-icon-btn ${appearance.appIcon === i ? 'selected' : ''}`}
                            onClick={() => setAppearance({ ...appearance, appIcon: i })}
                            style={{
                              background: [
                                '#5865f2', '#000', '#fff', '#23272a', '#f2f3f5',
                                'linear-gradient(135deg,#00d4ff,#7c3aed)', '#1a472a', '#c9a227',
                                'linear-gradient(90deg,#ff6b6b,#feca57,#48dbfb)', '#2c2f33',
                                '#eb459e', '#57f287', '#000', '#111', '#5865f2',
                                '#7c3aed', '#00aff4', '#ed4245', 'linear-gradient(135deg,#f47b67,#fee75c)', '#009b3a',
                              ][i],
                            }}
                          >
                            <FaDiscord size={22} color={i === 2 || i === 4 ? '#5865f2' : '#fff'} />
                            {appearance.appIcon === i && <span className="theme-check">✓</span>}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {settingsTab === 'aparencia' && settingsSub === 'mensagens-aparencia' && (
                    <>
                      <h3>Mensagens</h3>
                      <p className="privacy-title" style={{ marginTop: 8 }}>Mostrar imagens, vídeos e memes...</p>
                      <div className="privacy-row">
                        <div className="privacy-title">Quando publicados como links no chat.</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.showMediaLinks} onChange={(e) => setAppearance({ ...appearance, showMediaLinks: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Quando o envio é feito diretamente ao Discord.</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.showMediaUpload} onChange={(e) => setAppearance({ ...appearance, showMediaUpload: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Mostrar anexos e prévia de links</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.showEmbeds} onChange={(e) => setAppearance({ ...appearance, showEmbeds: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Mostrar reações de emoji</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.showEmojiReactions} onChange={(e) => setAppearance({ ...appearance, showEmojiReactions: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Mostrar spoilers</div>
                        <select className="filter-select" value={appearance.spoilers} onChange={(e) => setAppearance({ ...appearance, spoilers: e.target.value })}>
                          <option value="click">Ao clicar</option>
                          <option value="always">Sempre</option>
                          <option value="never">Nunca</option>
                        </select>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Abrir tópicos em janela dividida</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.splitTopics} onChange={(e) => setAppearance({ ...appearance, splitTopics: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div>
                          <div className="privacy-title">Mostrar avatares dos usuários</div>
                          <p className="privacy-desc">Para ocultar avatares, acesse Acessibilidade.</p>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.showAvatars} onChange={(e) => setAppearance({ ...appearance, showAvatars: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                    </>
                  )}

                  {settingsTab === 'aparencia' && settingsSub === 'caixa-chat' && (
                    <>
                      <h3>Caixa de chat</h3>
                      <div className="privacy-row">
                        <div className="privacy-title">Preveja emojis, menções e sintaxe de markdown enquanto digita</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.previewMarkdown} onChange={(e) => setAppearance({ ...appearance, previewMarkdown: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div>
                          <div className="privacy-title">Converter automaticamente emoticons em suas mensagens para emojis.</div>
                          <p className="privacy-desc">Por exemplo, quando você digitar :) o Discord vai converter para 😊</p>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.convertEmoticons} onChange={(e) => setAppearance({ ...appearance, convertEmoticons: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Mostrar figurinhas nos resultados de preenchimento automático</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.stickersAutocomplete} onChange={(e) => setAppearance({ ...appearance, stickersAutocomplete: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Mostrar jogos nos resultados de preenchimento automático</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.gamesAutocomplete} onChange={(e) => setAppearance({ ...appearance, gamesAutocomplete: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Mostrar botão de enviar mensagem</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.sendButton} onChange={(e) => setAppearance({ ...appearance, sendButton: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                    </>
                  )}

                  {settingsTab === 'aparencia' && settingsSub === 'buscar' && (
                    <>
                      <h3>Buscar</h3>
                      <p className="privacy-title" style={{ marginTop: 8 }}>Por padrão, buscando nas mensagens diretas...</p>
                      <label className="radio-row">
                        <input type="radio" name="search" checked={appearance.searchScope === 'selected'} onChange={() => setAppearance({ ...appearance, searchScope: 'selected' })} />
                        <div><strong>Busca apenas nas mensagens diretas selecionadas</strong></div>
                      </label>
                      <label className="radio-row">
                        <input type="radio" name="search" checked={appearance.searchScope === 'all'} onChange={() => setAppearance({ ...appearance, searchScope: 'all' })} />
                        <div><strong>Busca em todas as minhas mensagens diretas</strong></div>
                      </label>
                    </>
                  )}

                  {settingsTab === 'aparencia' && settingsSub === 'streamer' && (
                    <>
                      <h3>Modo streamer</h3>
                      <div className="privacy-row">
                        <div>
                          <div className="privacy-title">Ativar modo streamer</div>
                          <p className="privacy-desc">O modo streamer oculta suas informações pessoais para que outros assistindo à sua transmissão não possam vê-las.</p>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.streamerMode} onChange={(e) => setAppearance({ ...appearance, streamerMode: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <p className="privacy-title" style={{ marginTop: 12 }}>Se o modo streamer estiver habilitado...</p>
                      <div className="privacy-row">
                        <div className="privacy-title">Ocultar meus dados pessoais, como e-mail, contas conectadas e notas</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.hidePersonal} onChange={(e) => setAppearance({ ...appearance, hidePersonal: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Ocultar links de convite para meus servidores do Discord</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.hideInvites} onChange={(e) => setAppearance({ ...appearance, hideInvites: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Desativar todos os efeitos de som</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.disableSounds} onChange={(e) => setAppearance({ ...appearance, disableSounds: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="privacy-row">
                        <div className="privacy-title">Desativar notificações</div>
                        <label className="toggle">
                          <input type="checkbox" checked={appearance.disableNotifs} onChange={(e) => setAppearance({ ...appearance, disableNotifs: e.target.checked })} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                    </>
                  )}

                  {/* Placeholders das outras abas */}
                  {['notificacoes', 'cobranca', 'voz', 'acessibilidade', 'sistema', 'idioma', 'atividades', 'apps', 'dev'].includes(settingsTab) && (
                    <p className="settings-hint">Configurações de {settingsTab} — em breve.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal mudança de nome de usuário (sem senha) */}
            {showUsernameModal && (
              <div className="mini-modal-overlay" onClick={() => setShowUsernameModal(false)}>
                <div className="mini-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="mini-modal-header">
                    <h3>Mudança de nome de usuário</h3>
                    <button onClick={() => setShowUsernameModal(false)}><FaTimes /></button>
                  </div>
                  <p className="mini-modal-desc">Insira um novo nome de usuário.</p>

                  <label className="mini-label">Nome de usuário</label>
                  <div className="mini-input-wrap">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => {
                        setNewUsername(e.target.value)
                        setUsernameError('')
                      }}
                      className="mini-input"
                    />
                  </div>
                  <p className="mini-hint">Use apenas números, letras, underlines _ ou pontos.</p>

                  {usernameError && <p className="mini-error">{usernameError}</p>}

                  <div className="mini-modal-footer">
                    <button className="settings-btn" onClick={() => setShowUsernameModal(false)}>Cancelar</button>
                    <button
                      className="settings-btn primary"
                      onClick={() => {
                        if (!/^[a-zA-Z0-9._]+$/.test(newUsername.trim())) {
                          setUsernameError('Use apenas números, letras, underlines _ ou pontos.')
                          return
                        }
                        setUsername(newUsername.trim())
                        saveProfile({ username: newUsername.trim() })
                        setShowUsernameModal(false)
                      }}
                    >
                      Pronto
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== MODAL PERFIL + DECORAÇÕES ========== */}
        {showProfile && (
          <div className="settings-overlay">
            <div className="profile-modal">
              <div className="profile-sidebar">
                <div className="profile-sidebar-title">Perfil principal ▾</div>

                {/* Placa de identificação */}
                <div className="profile-section">
                  <div className="profile-section-title">Placa de identificação</div>
                  <div className="nameplate-row" onClick={() => openDecoModal('nameplate')} style={{ cursor: 'pointer' }}>
                    <div
                      className="nameplate-preview"
                      style={currentNameplate.id !== 'none' ? { background: currentNameplate.bg, borderRadius: 8 } : {}}
                    >
                      <FaDiscord size={14} />
                      <span style={{ color: '#fff' }}>{displayName}</span>
                    </div>
                    <button className="plus-btn" type="button"><FaPlus size={12} /></button>
                  </div>
                </div>

                {/* Avatar e decorações */}
                <div className="profile-section">
                  <div className="profile-section-title">Avatar e decorações</div>
                  <div className="avatar-grid">
                    <div
                      className={`avatar-option ${avatarImage || avatarStyle ? 'selected' : ''}`}
                      style={avatarImage ? {} : { background: currentAvatar.bg }}
                      onClick={() => { setShowAvatarMenu(true); setShowBannerMenu(false) }}
                    >
                      {avatarImage ? <img src={avatarImage} alt="" className="avatar-upload-preview" /> : avatarLetter}
                    </div>
                    <div
                      className="avatar-option add"
                      title="Decoração de avatar"
                      onClick={() => openDecoModal('avatarDeco')}
                      style={{}}
                    >
                      <FaPlus size={16} />
                    </div>
                  </div>
                  <p className="upload-hint">Clique na foto pra enviar · + pra decoração</p>
                </div>

                {/* Cor da faixa */}
                <div className="profile-section">
                  <div className="profile-section-title">Cor da faixa</div>
                  <div
                    className="banner-preview-box"
                    style={
                      bannerImage
                        ? { backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                        : { background: bannerColor }
                    }
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowBannerMenu(true)
                      setShowAvatarMenu(false)
                      setShowBannerPicker(false)
                    }}
                  >
                    <span className="banner-edit-icon"><FaPen size={12} /></span>
                  </div>
                  {showBannerMenu && (
                    <div className="context-menu" style={{ position: 'relative', marginTop: 8 }} onClick={(e) => e.stopPropagation()}>
                      <label className="context-menu-item">
                        <FaImage size={14} />
                        <span>Mudar foto</span>
                        <input type="file" accept="image/*" capture="environment" hidden onChange={(e) => { handleBannerUpload(e); setShowBannerMenu(false) }} />
                      </label>
                      <button className="context-menu-item" onClick={() => { setShowBannerMenu(false); setShowBannerPicker(true) }}>
                        <span className="color-dot" style={{ background: bannerColor }} />
                        <span>Mudar cor</span>
                      </button>
                      {bannerImage && (
                        <button className="context-menu-item danger" onClick={() => { setBannerImage(null); saveProfile({ bannerImage: null }); setShowBannerMenu(false) }}>
                          <FaTimes size={12} />
                          <span>Remover foto</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Efeitos de perfil e molduras */}
                <div className="profile-section">
                  <div className="profile-section-title">Efeitos de perfil e molduras</div>
                  <div className="effects-row">
                    <div
                      className="effect-box"
                      onClick={() => openDecoModal('frame')}
                      title="Moldura"
                    >
                      {currentFrame.id === 'none' ? <FaPlus /> : (currentFrame.image ? <img src={currentFrame.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : '🖼')}
                    </div>
                    <div className="effect-box" onClick={() => openDecoModal('frame')} title="Mais molduras">
                      <FaPlus />
                    </div>
                  </div>
                </div>

                {/* Estilo do nome exibido */}
                <div className="profile-section">
                  <div className="profile-section-title">
                    Estilo do nome exibido <span className="badge-novo-inline">NOVO</span>
                  </div>
                  <div
                    className="nameplate-preview"
                    style={{ cursor: 'pointer', justifyContent: 'space-between' }}
                    onClick={() => openDecoModal('nameStyle')}
                  >
                    <span style={getNameStyle()}>{displayName}</span>
                    <FaPlus size={12} />
                  </div>
                </div>
              </div>

              <div className="profile-preview" onClick={() => { setShowBannerMenu(false); setShowAvatarMenu(false) }}>
                <button className="settings-close profile-close" onClick={() => { setShowProfile(false); setShowBannerPicker(false); setShowBannerMenu(false); setShowAvatarMenu(false) }}>
                  <FaTimes />
                </button>

                <div className="profile-tabs">
                  <span className="active">Mural</span>
                  <span>Atividade</span>
                  <span>Lista de desejos</span>
                </div>

                <div className={`profile-card-wrap ${currentFrame.image ? 'has-profile-frame' : ''}`}>
                {currentFrame.image && (
                  <img src={currentFrame.image} alt="" className="profile-card-frame" />
                )}
                <div className="profile-card">
                  <div
                    className="profile-banner clickable"
                    style={
                      bannerImage
                        ? { backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                        : { background: bannerColor }
                    }
                  >
                    <button
                      className="banner-edit-btn visible"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowBannerMenu(v => !v)
                        setShowAvatarMenu(false)
                        setShowBannerPicker(false)
                      }}
                      title="Editar banner"
                    >
                      <FaPen size={14} />
                    </button>

                    {/* Menu do banner: Mudar foto / Mudar cor */}
                    {showBannerMenu && (
                      <div className="context-menu banner-context" onClick={(e) => e.stopPropagation()}>
                        <label className="context-menu-item">
                          <FaImage size={14} />
                          <span>Mudar foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            hidden
                            onChange={(e) => {
                              handleBannerUpload(e)
                              setShowBannerMenu(false)
                            }}
                          />
                        </label>
                        <button
                          className="context-menu-item"
                          onClick={() => {
                            setShowBannerMenu(false)
                            setShowBannerPicker(true)
                          }}
                        >
                          <span className="color-dot" style={{ background: bannerColor }} />
                          <span>Mudar cor</span>
                        </button>
                        {bannerImage && (
                          <button
                            className="context-menu-item danger"
                            onClick={() => {
                              setBannerImage(null)
                              saveProfile({ bannerImage: null })
                              setShowBannerMenu(false)
                            }}
                          >
                            <FaTimes size={12} />
                            <span>Remover foto</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="profile-avatar-wrap">
                    <div
                      className={`profile-big-avatar ${currentFrame.id !== 'none' ? 'has-frame' : ''}`}
                      style={{
                        ...(avatarImage ? { cursor: 'pointer' } : { background: currentAvatar.bg, cursor: 'pointer' }),
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowAvatarMenu(v => !v)
                        setShowBannerMenu(false)
                        setShowBannerPicker(false)
                      }}
                      title="Trocar foto de perfil"
                    >
                      {avatarImage ? (
                        <img src={avatarImage} alt="avatar" className="avatar-full" />
                      ) : (
                        avatarLetter
                      )}
                      {currentAvatarDeco.image && (
                        <img src={currentAvatarDeco.image} alt="" className="deco-overlay profile-deco" />
                      )}
                      <span className="status-dot big" />
                      <span className="avatar-edit-badge"><FaPen size={10} /></span>
                    </div>

                    {/* Menu do avatar */}
                    {showAvatarMenu && (
                      <div className="context-menu avatar-context" onClick={(e) => e.stopPropagation()}>
                        <label className="context-menu-item">
                          <FaUpload size={14} />
                          <span>Enviar foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            hidden
                            onChange={(e) => {
                              handleAvatarUpload(e)
                              setShowAvatarMenu(false)
                            }}
                          />
                        </label>
                        {avatarImage && (
                          <button
                            className="context-menu-item danger"
                            onClick={() => {
                              setAvatarImage(null)
                              saveProfile({ avatarImage: null })
                              setShowAvatarMenu(false)
                            }}
                          >
                            <FaTimes size={12} />
                            <span>Remover foto</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="profile-info">
                    <h2 style={getNameStyle()}>{displayName}</h2>
                    {currentNameplate.id !== 'none' && (
                      <div className="profile-nameplate-bar" style={{ background: currentNameplate.bg }}>
                        <FaDiscord size={12} /> {displayName}
                      </div>
                    )}
                    <p className="profile-handle">
                      {displayName.toLowerCase()}
                      {pronouns ? ` · ${pronouns}` : ' · '}
                      <button
                        className="link-btn"
                        onClick={() => {
                          const p = prompt('Pronomes (ex: ele/dele):', pronouns)
                          if (p !== null) {
                            setPronouns(p)
                            saveProfile({ pronouns: p })
                          }
                        }}
                      >
                        Adicionar pronomes
                      </button>
                    </p>

                    <div className="profile-actions">
                      <button className="msg-btn">Mensagem</button>
                      <button className="icon-action"><FaUserFriends /></button>
                    </div>

                    <div className="profile-bio-box">
                      <textarea
                        placeholder="Sua vibe — caótica, calma ou um meio termo?"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        onBlur={() => saveProfile({ bio })}
                        rows={2}
                      />
                    </div>

                    <p className="member-since">Membro desde · agora mesmo 🇧🇷</p>
                  </div>
                </div>
                </div>{/* fim profile-card-wrap */}

                <div className="profile-widgets">
                  <h4>Personalize seu perfil com widgets</h4>
                  <p>Explore widgets pra mostrar seus jogos e interesses</p>
                  <div className="widget-grid">
                    <div className="widget-card">🎮 Marvel Rivals</div>
                    <div className="widget-card">🌊 Wuthering Waves</div>
                    <div className="widget-card">⚔️ Arknights Endfield</div>
                    <div className="widget-card">🏆 Jogo favorito</div>
                    <div className="widget-card add">+</div>
                  </div>
                </div>
              </div>

              {/* Color / Banner picker popup */}
              {showBannerPicker && (
                <div className="banner-picker-popup">
                  <div className="banner-picker-header">
                    <span>Editar fundo do banner</span>
                    <button onClick={() => setShowBannerPicker(false)}><FaTimes /></button>
                  </div>

                  <div className="color-spectrum" style={{ background: `linear-gradient(to bottom, white, ${bannerColor}), linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)` }}>
                    <div className="spectrum-cursor" />
                  </div>

                  <div className="hue-bar">
                    <input
                      type="range"
                      min="0"
                      max="360"
                      defaultValue="20"
                      className="hue-slider"
                      onChange={(e) => {
                        const h = e.target.value
                        // simple HSL to approx hex for demo
                        const c = document.createElement('canvas')
                        c.width = c.height = 1
                        const ctx = c.getContext('2d')
                        ctx.fillStyle = `hsl(${h}, 100%, 50%)`
                        ctx.fillRect(0, 0, 1, 1)
                        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
                        const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
                        applyBannerColor(hex)
                      }}
                    />
                  </div>

                  <div className="hex-row">
                    <span className="hex-hash">#</span>
                    <input
                      type="text"
                      value={hexInput.replace('#', '')}
                      maxLength={6}
                      onChange={(e) => handleHexChange('#' + e.target.value.replace(/[^0-9A-Fa-f]/g, ''))}
                      className="hex-input"
                    />
                    <label className="eyedrop-btn" title="Enviar imagem de banner">
                      <FaImage />
                      <input type="file" accept="image/*" capture="environment" hidden onChange={handleBannerUpload} />
                    </label>
                  </div>

                  <div className="preset-row">
                    {PRESET_COLORS.slice(0, 5).map((c) => (
                      <div
                        key={c}
                        className={`preset-swatch ${!bannerImage && bannerColor === c ? 'selected' : ''}`}
                        style={{ background: c }}
                        onClick={() => applyBannerColor(c)}
                      />
                    ))}
                  </div>

                  <div className="picker-actions">
                    <label className="settings-btn primary" style={{ cursor: 'pointer', flex: 1, textAlign: 'center' }}>
                      <FaUpload size={12} style={{ marginRight: 6 }} />
                      Usar foto / galeria
                      <input type="file" accept="image/*" capture="environment" hidden onChange={handleBannerUpload} />
                    </label>
                    <button
                      className="settings-btn"
                      onClick={() => {
                        setBannerImage(null)
                        saveProfile({ bannerImage: null })
                      }}
                    >
                      Só cor
                    </button>
                  </div>
                </div>
              )}

              {/* ===== MODAIS DE DECORAÇÃO (layout igual Discord) ===== */}
              {decoModal && (
                <div className="deco-modal-overlay" onClick={() => setDecoModal(null)}>
                  <div className="deco-modal deco-modal-wide" data-type={decoModal} onClick={(e) => e.stopPropagation()}>
                    <div className="deco-modal-header">
                      <h3>
                        {decoModal === 'frame' && 'Alterar moldura de perfil'}
                        {decoModal === 'avatarDeco' && 'Mudar decoração de avatar'}
                        {decoModal === 'nameStyle' && 'Alterar estilo do nome exibido'}
                        {decoModal === 'nameplate' && 'Alterar placa de identificação'}
                      </h3>
                      <button onClick={() => setDecoModal(null)}><FaTimes /></button>
                    </div>

                    <div className="deco-modal-split">
                      {/* COLUNA ESQUERDA */}
                      <div className="deco-modal-left">
                        {/* MOLDURAS */}
                        {decoModal === 'frame' && (
                          <>
                            <p className="deco-section-label">Suas molduras</p>
                            <div className="owned-row">
                              {FRAMES.owned.map((f) => (
                                <div
                                  key={f.id}
                                  className={`owned-slot ${tempDeco === f.id ? 'selected' : ''}`}
                                  onClick={() => setTempDeco(f.id)}
                                >
                                  {f.id === 'none' ? (
                                    <span className="deco-none">∅<br /><small>Nenhum</small></span>
                                  ) : f.image ? (
                                    <img src={f.image} alt={f.name} />
                                  ) : (
                                    <span className="deco-emoji">🖼</span>
                                  )}
                                </div>
                              ))}
                              <div className="owned-slot loja-slot" title="Loja">
                                <MdOutlineStorefront size={22} />
                                <small>Loja</small>
                              </div>
                            </div>
                            <p className="deco-section-label">Veja o que há na Loja</p>
                            <div className="shop-grid">
                              {FRAMES.shop.map((f) => (
                                <div
                                  key={f.id}
                                  className={`shop-slot ${tempDeco === f.id ? 'selected' : ''}`}
                                  onClick={() => setTempDeco(f.id)}
                                >
                                  {f.image ? (
                                    <img src={f.image} alt={f.name} />
                                  ) : (
                                    <div className="shop-placeholder" />
                                  )}
                                  {f.locked && <span className="lock-badge">🔒</span>}
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {/* DECORAÇÃO AVATAR */}
                        {decoModal === 'avatarDeco' && (
                          <>
                            <p className="deco-section-label">Suas decorações</p>
                            <div className="owned-row">
                              {AVATAR_DECOS.owned.map((d) => (
                                <div
                                  key={d.id}
                                  className={`owned-slot circle ${tempDeco === d.id ? 'selected' : ''}`}
                                  onClick={() => setTempDeco(d.id)}
                                >
                                  {d.id === 'none' ? (
                                    <span className="deco-none">∅<br /><small>Nenhum</small></span>
                                  ) : d.image ? (
                                    <img src={d.image} alt={d.name} />
                                  ) : (
                                    <span className="deco-emoji">✨</span>
                                  )}
                                </div>
                              ))}
                              <div className="owned-slot circle loja-slot">
                                <MdOutlineStorefront size={22} />
                                <small>Loja</small>
                              </div>
                            </div>
                            <p className="deco-section-label">Veja o que há na Loja</p>
                            <div className="shop-grid">
                              {AVATAR_DECOS.shop.map((d) => (
                                <div
                                  key={d.id}
                                  className={`shop-slot circle ${tempDeco === d.id ? 'selected' : ''}`}
                                  onClick={() => setTempDeco(d.id)}
                                >
                                  {d.image ? <img src={d.image} alt={d.name} /> : <div className="shop-placeholder circle" />}
                                  {d.locked && <span className="lock-badge">🔒</span>}
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {/* ESTILO DO NOME */}
                        {decoModal === 'nameStyle' && tempDeco && typeof tempDeco === 'object' && (
                          <>
                            <p className="deco-section-label">Escolha fonte</p>
                            <div className="font-grid">
                              {NAME_FONTS.map((f) => (
                                <button
                                  key={f.id}
                                  className={`font-btn ${tempDeco.font === f.id ? 'selected' : ''}`}
                                  style={{ fontFamily: f.family }}
                                  onClick={() => setTempDeco({ ...tempDeco, font: f.id })}
                                >
                                  Gg
                                </button>
                              ))}
                            </div>
                            <p className="deco-section-label">Escolha efeito</p>
                            <div className="effect-btns">
                              {NAME_EFFECTS.map((e) => (
                                <button
                                  key={e.id}
                                  className={`effect-btn ${tempDeco.effect === e.id ? 'selected' : ''}`}
                                  onClick={() => setTempDeco({ ...tempDeco, effect: e.id })}
                                >
                                  {e.name}
                                </button>
                              ))}
                            </div>
                            <p className="deco-section-label">Escolha cor</p>
                            <div className="name-color-row">
                              {NAME_COLORS.map((c) => (
                                <div
                                  key={c}
                                  className={`name-color-swatch ${tempDeco.color === c ? 'selected' : ''}`}
                                  style={{ background: c }}
                                  onClick={() => setTempDeco({ ...tempDeco, color: c })}
                                />
                              ))}
                            </div>
                          </>
                        )}

                        {/* PLACA */}
                        {decoModal === 'nameplate' && (
                          <>
                            <p className="deco-section-label">Suas placas de identificação</p>
                            <div className="owned-row">
                              {NAMEPLATES.owned.map((n) => (
                                <div
                                  key={n.id}
                                  className={`owned-slot wide ${tempDeco === n.id ? 'selected' : ''}`}
                                  onClick={() => setTempDeco(n.id)}
                                  style={n.bg && n.id !== 'none' ? { background: n.bg } : {}}
                                >
                                  {n.id === 'none' ? (
                                    <span className="deco-none">∅ Nenhum</span>
                                  ) : (
                                    <><FaDiscord size={12} /> <span>{displayName}</span></>
                                  )}
                                </div>
                              ))}
                              <div className="owned-slot loja-slot">
                                <MdOutlineStorefront size={20} />
                                <small>Loja</small>
                              </div>
                            </div>
                            <p className="deco-section-label">Veja o que há na Loja</p>
                            <div className="nameplate-list">
                              {NAMEPLATES.shop.map((n) => (
                                <div
                                  key={n.id}
                                  className={`nameplate-item ${tempDeco === n.id ? 'selected' : ''}`}
                                  onClick={() => setTempDeco(n.id)}
                                  style={{ background: '#1e1f22' }}
                                >
                                  {n.image ? <img src={n.image} alt={n.name} style={{ height: 28, borderRadius: 4 }} /> : <FaDiscord size={14} />}
                                  <span>{n.name}</span>
                                  {n.locked && <span className="lock-badge">🔒</span>}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* COLUNA DIREITA - PREVIEW */}
                      <div className="deco-modal-right">
                        {(() => {
                          const previewFrame = decoModal === 'frame' && tempDeco && tempDeco !== 'none'
                            ? allFrames.find(x => x.id === tempDeco)
                            : (currentFrame.id !== 'none' ? currentFrame : null)
                          const previewDeco = decoModal === 'avatarDeco' && tempDeco && tempDeco !== 'none'
                            ? allDecos.find(x => x.id === tempDeco)
                            : (currentAvatarDeco.id !== 'none' ? currentAvatarDeco : null)
                          return (
                        <div className={`deco-preview-card-wrap ${previewFrame?.image ? 'has-profile-frame' : ''}`}>
                          {previewFrame?.image && (
                            <img src={previewFrame.image} alt="" className="profile-card-frame" />
                          )}
                          <div className="deco-preview-card">
                            <div
                              className="deco-preview-banner"
                              style={
                                bannerImage
                                  ? { backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover' }
                                  : { background: bannerColor }
                              }
                            />
                            <div className="deco-preview-avatar-wrap">
                              <div
                                className="deco-preview-avatar"
                                style={avatarImage ? {} : { background: currentAvatar.bg }}
                              >
                                {avatarImage ? <img src={avatarImage} alt="" /> : avatarLetter}
                                {previewDeco?.image && (
                                  <img src={previewDeco.image} className="deco-overlay" alt="" />
                                )}
                              </div>
                            </div>
                            <div className="deco-preview-info">
                              <h3 style={decoModal === 'nameStyle' && tempDeco?.font ? {
                                fontFamily: (NAME_FONTS.find(f => f.id === tempDeco.font) || NAME_FONTS[0]).family,
                                color: tempDeco.color,
                                ...(tempDeco.effect === 'neon' ? { textShadow: `0 0 8px ${tempDeco.color}` } : {}),
                              } : getNameStyle()}>
                                {displayName}
                              </h3>
                              <p className="deco-preview-handle">{displayName.toLowerCase()}</p>
                              {bio && <p className="deco-preview-bio">{bio}</p>}
                              <button className="msg-btn" style={{ width: '100%', marginTop: 12 }}>Botão exemplo</button>
                            </div>
                          </div>
                        </div>
                          )
                        })()}

                        {/* Aviso se item da loja (bloqueado) */}
                        {tempDeco && tempDeco !== 'none' && (
                          (() => {
                            const item =
                              decoModal === 'frame' ? allFrames.find(x => x.id === tempDeco) :
                              decoModal === 'avatarDeco' ? allDecos.find(x => x.id === tempDeco) :
                              decoModal === 'nameplate' ? allPlates.find(x => x.id === tempDeco) : null
                            if (item?.locked) {
                              return (
                                <div className="shop-locked-info">
                                  <strong>{item.name}</strong>
                                  <p>Acesse a Loja para comprar e coletar este item.</p>
                                </div>
                              )
                            }
                            return null
                          })()
                        )}
                      </div>
                    </div>

                    <div className="deco-modal-footer">
                      <button className="settings-btn" onClick={() => setDecoModal(null)}>Cancelar</button>
                      {tempDeco && (
                        (decoModal === 'frame' && allFrames.find(x => x.id === tempDeco)?.locked) ||
                        (decoModal === 'avatarDeco' && allDecos.find(x => x.id === tempDeco)?.locked) ||
                        (decoModal === 'nameplate' && allPlates.find(x => x.id === tempDeco)?.locked)
                      ) ? (
                        <button className="settings-btn primary">Ir para a Loja</button>
                      ) : (
                        <button className="settings-btn primary" onClick={applyDecoModal}>Aplicar</button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // ========== TELA DE LOGIN / CADASTRO ==========
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">D2</div>
          {authScreen === 'welcome' && (
            <>
              <h1>Bem-vindo 🇧🇷</h1>
              <p>Entra na sua conta ou cria uma nova pra começar.</p>
            </>
          )}
          {authScreen === 'login' && (
            <>
              <h1>Entrar</h1>
              <p>Coloca usuário e senha pra continuar.</p>
            </>
          )}
          {authScreen === 'register' && (
            <>
              <h1>Criar conta</h1>
              <p>Preenche os dados pra se cadastrar.</p>
            </>
          )}
        </div>

        {authScreen === 'welcome' && (
          <div className="welcome-actions">
            <button type="button" className="login-button" onClick={() => setAuthScreen('login')}>
              Entrar
            </button>
            <button type="button" className="login-button secondary-btn" onClick={() => setAuthScreen('register')}>
              Criar conta
            </button>
            <div className="divider"><span>OU</span></div>
            <button type="button" className="google-button" onClick={handleGoogleLogin}>
              <FaGoogle className="google-icon" />
              Continuar com Google
            </button>
          </div>
        )}

        {authScreen === 'login' && (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">E-MAIL, TELEFONE OU USUÁRIO *</label>
              <div className="input-icon">
                <FaEnvelope className="icon" />
                <input
                  id="email"
                  type="text"
                  placeholder="Seu usuário ou e-mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors({ ...errors, email: '', general: '' })
                  }}
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="input-group">
              <div className="password-label">
                <label htmlFor="password">SENHA *</label>
              </div>
              <div className="input-icon">
                <FaLock className="icon" />
                <input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors({ ...errors, password: '', general: '' })
                  }}
                  className={errors.password ? 'error' : ''}
                />
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <label className="remember-me">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <span>Salvar neste aparelho</span>
            </label>
            <button className="login-button" type="submit">Entrar</button>
            <button type="button" className="link-back" onClick={() => setAuthScreen('welcome')}>← Voltar</button>
          </form>
        )}

        {authScreen === 'register' && (
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>DATA DE NASCIMENTO *</label>
              <input
                type="date"
                className="date-input"
                value={regBirth}
                onChange={(e) => setRegBirth(e.target.value)}
              />
              {regErrors.birth && <span className="error-message">{regErrors.birth}</span>}
            </div>
            <div className="input-group">
              <label>USUÁRIO *</label>
              <div className="input-icon">
                <FaEnvelope className="icon" />
                <input
                  type="text"
                  placeholder="nome_de_usuario"
                  value={regUser}
                  onChange={(e) => setRegUser(e.target.value)}
                />
              </div>
              {regErrors.user && <span className="error-message">{regErrors.user}</span>}
            </div>
            <div className="input-group">
              <label>SENHA *</label>
              <div className="input-icon">
                <FaLock className="icon" />
                <input type="password" placeholder="Crie uma senha" value={regPass} onChange={(e) => setRegPass(e.target.value)} />
              </div>
              {regErrors.pass && <span className="error-message">{regErrors.pass}</span>}
            </div>
            <div className="input-group">
              <label>CONFIRMAR SENHA *</label>
              <div className="input-icon">
                <FaLock className="icon" />
                <input type="password" placeholder="Repita a senha" value={regPass2} onChange={(e) => setRegPass2(e.target.value)} />
              </div>
              {regErrors.pass2 && <span className="error-message">{regErrors.pass2}</span>}
            </div>
            <button className="login-button" type="submit">Criar conta</button>
            <button type="button" className="link-back" onClick={() => setAuthScreen('welcome')}>← Voltar</button>
          </form>
        )}
      </div>

      {showGoogleModal && (
        <div className="modal-overlay" onClick={() => setShowGoogleModal(false)}>
          <div className="modal-card google-picker" onClick={(e) => e.stopPropagation()}>
            <div className="google-picker-header">
              <FaGoogle size={22} color="#ea4335" />
              <h2>Escolher conta Google</h2>
            </div>
            <p className="mini-modal-desc">
              Selecione uma conta para continuar.
              <br />
              <small style={{ color: '#949ba4' }}>
                (Simulação local — o navegador não permite listar seus e-mails reais do Google sem OAuth oficial.)
              </small>
            </p>
            <button type="button" className="google-account" onClick={() => confirmGoogleLogin('usuario.brasil@gmail.com')}>
              <span className="google-avatar">U</span>
              <div>
                <strong>Usuario Brasil</strong>
                <p>usuario.brasil@gmail.com</p>
              </div>
            </button>
            <button type="button" className="google-account" onClick={() => confirmGoogleLogin('arara.verde@gmail.com')}>
              <span className="google-avatar" style={{ background: '#009b3a' }}>A</span>
              <div>
                <strong>Arara Verde</strong>
                <p>arara.verde@gmail.com</p>
              </div>
            </button>
            <button type="button" className="google-account" onClick={() => confirmGoogleLogin('outra.conta@gmail.com')}>
              <span className="google-avatar" style={{ background: '#fedf00', color: '#111' }}>O</span>
              <div>
                <strong>Usar outra conta</strong>
                <p>outra.conta@gmail.com</p>
              </div>
            </button>
            <button type="button" className="settings-btn" style={{ marginTop: 12, width: '100%' }} onClick={() => setShowGoogleModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-icon">
              <FaCheckCircle size={56} color="#57f287" />
            </div>
            <h2>Login feito com sucesso!</h2>
            <p>
              Bem-vindo de volta, <strong>{displayName}</strong>.
              <br />
              Tá logado, pode mandar ver!
            </p>
            <button className="modal-button" onClick={handleContinue}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

/* ============================================================
   terminalData.js — 300+ Commands Registry for Mikhayl Terminal
   Supports Linux, Windows (CMD/PowerShell), DevOps, & Easter Eggs
   ============================================================ */

export const NEOFETCH_ART = `
      /\\_/\\       OS: Arch Linux x86_64
     ( o.o )      Host: Portfolio Hyperdrive 2026
      > ^ <       Kernel: 6.6.0-zen-portfolio
                  Shell: interactive-bash v3.0
                  Uptime: 24/7 (Coding & Exploring)
                  Audio: The 1975 - About You
                  Stack: React + CSS + Web Audio + Supabase
                  Vibe: ⚡ Cyberpunk Nocturnal 🌙
`;

export const QUICK_COMMANDS = [
  'help',
  'neofetch',
  'whoami',
  'ls',
  'cat about.txt',
  'snake',
  'matrix',
  'git status',
  'clear',
  'exit',
];

// Helper to format date
const getNowStr = () => new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'long' });

// Static Command Registry definitions
export const COMMAND_HANDLERS = {
  // --- SYSTEM & INFO ---
  help: () => ({
    type: 'info',
    text: [
      '⚡ MIKHAYL LINUX & WINDOWS TERMINAL SHELL (300+ Commands Supported) ⚡',
      '───────────────────────────────────────────────────────────────────',
      'NAVIGASI & FILE  : ls, dir, cd, pwd, cat, touch, rm, del, mkdir, md, cp, copy, mv, move, tree',
      'SISTEM & MONITOR : whoami, uname, neofetch, fastfetch, ps, top, htop, uptime, free, df, du, tasklist',
      'JARINGAN & WEB   : ping, curl, wget, ipconfig, ifconfig, netstat, traceroute, nslookup, dig, ssh',
      'DEV & TOOLS      : git, docker, npm, npx, node, python, pip, cargo, go, gcc, code, vim, nano',
      'PORTFOLIO SHORT  : snake, matrix, theme, music, about, contact, skills, projects, github',
      'EASTER EGGS      : cowsay, fortune, sl, cmatrix, hack, konami, mikhayl, crush, oshi, lolcat',
      'WINDOWS ALIASES  : cls, dir, ver, systeminfo, taskkill, getmac, chkdsk, sfc, powershell, cmd',
      '───────────────────────────────────────────────────────────────────',
      'Ketik perintah apapun atau gunakan tombol Tab untuk autocompletion!',
    ].join('\n'),
  }),
  '?': () => COMMAND_HANDLERS.help(),

  whoami: () => ({ type: 'ok', text: 'mikhayl (root developer & nocturnal cyberpunk explorer)' }),
  who: () => ({ type: 'out', text: 'mikhayl  pts/0        2026-11-08 00:00 (:0)' }),
  w: () => ({ type: 'out', text: ' 00:01:00 up 24 days, 7 hrs,  1 user,  load average: 0.08, 0.05, 0.01\nUSER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT\nmikhayl  pts/0    127.0.0.1        00:00    0.00s  0.15s  0.02s interactive-bash' }),
  id: () => ({ type: 'out', text: 'uid=1000(mikhayl) gid=1000(mikhayl) groups=1000(mikhayl),4(adm),24(cdrom),27(sudo),998(wheel),999(docker)' }),
  groups: () => ({ type: 'out', text: 'mikhayl adm sudo docker wheel audio video input' }),
  logname: () => ({ type: 'out', text: 'mikhayl' }),
  hostname: () => ({ type: 'out', text: 'portfolio-hyperdrive.local' }),
  arch: () => ({ type: 'out', text: 'x86_64' }),
  uptime: () => ({ type: 'out', text: 'up 42 days, 13 hours, 37 minutes, 1 user, load average: 0.12, 0.08, 0.02' }),
  date: () => ({ type: 'out', text: getNowStr() }),
  cal: () => ({
    type: 'out',
    text: [
      '    November 2026   ',
      'Su Mo Tu We Th Fr Sa',
      ' 1  2  3  4  5  6  7',
      ' 8  9 10 11 12 13 14',
      '15 16 17 18 19 20 21',
      '22 23 24 25 26 27 28',
      '29 30               ',
    ].join('\n'),
  }),

  // Linux Specs & Neofetch
  neofetch: () => ({ type: 'ascii', text: NEOFETCH_ART.trim() }),
  fastfetch: () => ({ type: 'ascii', text: NEOFETCH_ART.trim() }),
  screenfetch: () => ({ type: 'ascii', text: NEOFETCH_ART.trim() }),
  pfetch: () => ({ type: 'ascii', text: '  /\\_/\\  mikhayl@hyperdrive\n ( o.o ) os: Arch Linux x86_64\n  > ^ <  host: React + Vite + Supabase\n         kernel: 6.6.0-zen-portfolio' }),

  uname: (arg) => {
    if (arg === '-a' || arg === '-all') {
      return { type: 'out', text: 'Linux mikhayl-hyperdrive 6.6.0-zen-portfolio #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' };
    }
    if (arg === '-r') return { type: 'out', text: '6.6.0-zen-portfolio' };
    if (arg === '-m') return { type: 'out', text: 'x86_64' };
    if (arg === '-o') return { type: 'out', text: 'GNU/Linux' };
    return { type: 'out', text: 'Linux' };
  },

  // --- FILE SYSTEM (LINUX & WINDOWS) ---
  ls: (arg) => {
    if (arg?.includes('-l') || arg?.includes('-la') || arg?.includes('-al')) {
      return {
        type: 'out',
        text: [
          'total 48',
          'drwxr-xr-x 4 mikhayl mikhayl 4096 Nov  8 00:00 .',
          'drwxr-xr-x 6 root    root    4096 Nov  1 12:00 ..',
          '-rw-r--r-- 1 mikhayl mikhayl 1240 Nov  8 00:00 about.txt',
          '-rw-r--r-- 1 mikhayl mikhayl  528 Nov  8 00:00 contact.json',
          '-rw-r--r-- 1 mikhayl mikhayl 3840 Nov  8 00:00 secret_vault.gpg',
          'drwxr-xr-x 2 mikhayl mikhayl 4096 Nov  8 00:00 projects/',
          'drwxr-xr-x 2 mikhayl mikhayl 4096 Nov  8 00:00 skills/',
          '-rwxr-xr-x 1 mikhayl mikhayl 8192 Nov  8 00:00 play_snake.sh',
        ].join('\n'),
      };
    }
    return { type: 'out', text: 'about.txt   contact.json   projects/   skills/   secret_vault.gpg   play_snake.sh' };
  },
  dir: (arg) => {
    return {
      type: 'out',
      text: [
        ' Volume in drive C is PORTFOLIO_OS',
        ' Volume Serial Number is 2026-MIKHAYL',
        '',
        ' Directory of C:\\Users\\Mikhayl',
        '',
        '08/11/2026  00:00    <DIR>          .',
        '08/11/2026  00:00    <DIR>          ..',
        '08/11/2026  00:00    <DIR>          projects',
        '08/11/2026  00:00    <DIR>          skills',
        '08/11/2026  00:00             1,240 about.txt',
        '08/11/2026  00:00               528 contact.json',
        '08/11/2026  00:00             3,840 secret_vault.gpg',
        '08/11/2026  00:00             8,192 play_snake.sh',
        '               4 File(s)         13,800 bytes',
        '               4 Dir(s)   512,892,104,704 bytes free',
      ].join('\n'),
    };
  },
  vdir: (arg) => COMMAND_HANDLERS.ls('-l'),
  pwd: () => ({ type: 'out', text: '/home/mikhayl/portfolio' }),
  cd: (arg) => {
    if (!arg || arg === '~' || arg === '/') return { type: 'out', text: 'Navigated to /home/mikhayl' };
    if (arg === '..' || arg === '../') return { type: 'out', text: 'Navigated to /home' };
    if (arg === 'projects' || arg === 'skills') return { type: 'ok', text: `Navigated to /home/mikhayl/${arg}` };
    return { type: 'warn', text: `cd: no such file or directory: ${arg}` };
  },
  tree: () => ({
    type: 'out',
    text: [
      '.',
      '├── about.txt',
      '├── contact.json',
      '├── play_snake.sh',
      '├── secret_vault.gpg',
      '├── projects/',
      '│   ├── portofolio-v3/',
      '│   ├── pameran-surabaya/',
      '│   └── cyber-snake-arcade/',
      '└── skills/',
      '    ├── frontend.json',
      '    ├── linux-sysadmin.md',
      '    └── visual-arts.png',
    ].join('\n'),
  }),
  mkdir: (arg) => ({ type: 'ok', text: `Directory created: ${arg || 'new_folder'}` }),
  md: (arg) => ({ type: 'ok', text: `Directory created: ${arg || 'new_folder'}` }),
  rmdir: (arg) => ({ type: 'ok', text: `Directory removed: ${arg || 'target'}` }),
  rd: (arg) => ({ type: 'ok', text: `Directory removed: ${arg || 'target'}` }),
  touch: (arg) => ({ type: 'ok', text: `File created or timestamp updated: ${arg || 'newfile.txt'}` }),
  rm: (arg) => {
    if (arg?.includes('-rf /') || arg?.includes('-rf *')) {
      return { type: 'error', text: '🚨 CRITICAL ERROR: Permission denied by Mikhayl Cyber Guardian Defense protocol!' };
    }
    return { type: 'ok', text: `Removed: ${arg || 'file'}` };
  },
  del: (arg) => COMMAND_HANDLERS.rm(arg),
  erase: (arg) => COMMAND_HANDLERS.rm(arg),
  cp: (arg) => ({ type: 'ok', text: `Copied successfully: ${arg || 'source -> dest'}` }),
  copy: (arg) => ({ type: 'ok', text: `Copied successfully: ${arg || 'source -> dest'}` }),
  mv: (arg) => ({ type: 'ok', text: `Moved successfully: ${arg || 'source -> dest'}` }),
  move: (arg) => ({ type: 'ok', text: `Moved successfully: ${arg || 'source -> dest'}` }),
  ren: (arg) => ({ type: 'ok', text: `Renamed successfully: ${arg || 'old -> new'}` }),
  rename: (arg) => ({ type: 'ok', text: `Renamed successfully: ${arg || 'old -> new'}` }),
  cat: (arg) => {
    const f = (arg || '').trim().toLowerCase();
    if (!f) return { type: 'warn', text: 'Penggunaan: cat <nama_file> (contoh: cat about.txt, cat contact.json)' };
    if (f.includes('about')) {
      return {
        type: 'info',
        text: [
          '═══════════════════ ABOUT MIKHAYL ═══════════════════',
          '• Pelajar yang suka ngulik hal random dan teknologi kreatif.',
          '• Hobi: Komputer, Linux, Desain Grafis, Kamera & Sinematografi.',
          '• Kota: Jakarta ➜ Surabaya ➜ Gorontalo.',
          '• Motto: "Belajar komputer bikin elu keliatan keren" 🚀',
          '══════════════════════════════════════════════════════',
        ].join('\n'),
      };
    }
    if (f.includes('contact')) {
      return {
        type: 'out',
        text: JSON.stringify(
          {
            name: 'Mikhayl',
            github: 'https://github.com/Mikhayl-05',
            instagram: '@mhmyl_',
            portfolio: 'https://mikhayl.my.id',
            status: 'Always coding & exploring nocturnal vibes',
          },
          null,
          2
        ),
      };
    }
    if (f.includes('secret')) {
      return {
        type: 'warn',
        text: '🔒 [GPG ENCRYPTED ARCHIVE]\n-----BEGIN PGP MESSAGE-----\nhQGMA4Z8f8K79Q3zAQv/Wj4009AKZ82...\nClue: Ketik "snake" atau "matrix" untuk membuka portal rahasia!',
      };
    }
    return { type: 'out', text: `[Content of ${arg}]: Simulated content preview for ${arg}.` };
  },
  type: (arg) => COMMAND_HANDLERS.cat(arg),
  more: (arg) => COMMAND_HANDLERS.cat(arg),
  less: (arg) => COMMAND_HANDLERS.cat(arg),
  head: (arg) => ({ type: 'out', text: `==> Top 10 lines of ${arg || 'file'}:\nLine 1: System initiated.\nLine 2: Portfolio loaded.\nLine 3: Welcome!` }),
  tail: (arg) => ({ type: 'out', text: `==> Last 10 lines of ${arg || 'file'}:\nLine 98: Status OK.\nLine 99: Ready for next task.\nLine 100: End of log.` }),
  wc: (arg) => ({ type: 'out', text: `  42  180 1240 ${arg || 'about.txt'}` }),
  grep: (arg) => ({ type: 'ok', text: `Match found for pattern in ${arg || 'files'}: 2 occurrences highlighted.` }),
  find: (arg) => ({ type: 'out', text: `./about.txt\n./contact.json\n./projects/portfolio\n./skills/linux` }),
  findstr: (arg) => ({ type: 'ok', text: `FINDSTR: Match located in document lines.` }),
  which: (arg) => ({ type: 'out', text: `/usr/bin/${arg || 'bash'}` }),
  where: (arg) => ({ type: 'out', text: `C:\\Windows\\System32\\${arg || 'cmd'}.exe` }),
  whereis: (arg) => ({ type: 'out', text: `${arg}: /usr/bin/${arg} /usr/share/man/man1/${arg}.1.gz` }),
  whatis: (arg) => ({ type: 'out', text: `${arg || 'bash'} (1) - GNU Bourne-Again SHell` }),
  stat: (arg) => ({ type: 'out', text: `  File: ${arg || 'about.txt'}\n  Size: 1240       Blocks: 8          IO Block: 4096   regular file\nDevice: 259,2    Inode: 14205842    Links: 1\nAccess: (0644/-rw-r--r--)` }),
  file: (arg) => ({ type: 'out', text: `${arg || 'about.txt'}: UTF-8 Unicode text, with very long lines` }),
  du: (arg) => ({ type: 'out', text: '4.0K\t./projects\n8.0K\t./skills\n48K\t.' }),
  df: (arg) => ({
    type: 'out',
    text: [
      'Filesystem     1K-blocks      Used Available Use% Mounted on',
      '/dev/nvme0n1p2 960380120 125409320 786118944  14% /',
      'tmpfs           16348120      4200  16343920   1% /run',
      '/dev/nvme0n1p1    523248     64820    458428  13% /boot/efi',
    ].join('\n'),
  }),

  // --- PROCESS & HARDWARE ---
  ps: () => ({
    type: 'out',
    text: [
      '  PID TTY          TIME CMD',
      ' 1337 pts/0    00:00:01 bash',
      ' 2048 pts/0    00:00:02 vite-dev-server',
      ' 4096 pts/0    00:00:04 react-cyberpunk',
      ' 7777 pts/0    00:00:00 ps',
    ].join('\n'),
  }),
  top: () => ({
    type: 'out',
    text: [
      'top - 00:00:01 up 42 days,  1 user,  load average: 0.10, 0.08, 0.02',
      'Tasks: 120 total,   1 running, 119 sleeping,   0 stopped,   0 zombie',
      '%Cpu(s):  2.3 us,  0.7 sy,  0.0 ni, 96.8 id,  0.1 wa,  0.1 hi',
      'MiB Mem :  16384.0 total,   8192.0 free,   4200.0 used,   3992.0 buff/cache',
      'MiB Swap:   4096.0 total,   4096.0 free,      0.0 used.',
    ].join('\n'),
  }),
  htop: () => COMMAND_HANDLERS.top(),
  free: () => ({
    type: 'out',
    text: [
      '               total        used        free      shared  buff/cache   available',
      'Mem:        16384000     4200000     8192000      210000     3992000    11974000',
      'Swap:        4096000           0     4096000',
    ].join('\n'),
  }),
  vmstat: () => ({ type: 'out', text: 'procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----\n r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st\n 1  0      0 8192000  50000 3942000    0    0     2    15   80  120  2  1 97  0  0' }),
  iostat: () => ({ type: 'out', text: 'Linux 6.6.0-zen-portfolio (hyperdrive) \tAvg-CPU:  %user 2.4  %system 0.8  %idle 96.8\nDevice             tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn\nnvme0n1          14.20       120.50       240.80    5023920   10047840' }),
  dmesg: () => ({ type: 'out', text: '[    0.000000] Linux version 6.6.0-zen-portfolio (mikhayl@hyperdrive)\n[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-linux root=UUID=2026-MIKHAYL rw quiet\n[    1.240592] systemd[1]: Detected architecture x86-64.\n[    2.104920] Cyberpunk Hyperdrive Audio Engine initialized successfully.' }),
  lscpu: () => ({ type: 'out', text: 'Architecture:            x86_64\nCPU op-mode(s):        32-bit, 64-bit\nModel name:              AMD Ryzen 7 5800H with Radeon Graphics\nCPU(s):                  16\nThread(s) per core:      2\nMax Speed:               4.40 GHz' }),
  lsmem: () => ({ type: 'out', text: 'RANGE                                  SIZE  STATE REMOVABLE BLOCK\n0x0000000000000000-0x00000003ffffffff   16G online        no  0-127\n\nMemory block size:       128M\nTotal online memory:      16G' }),
  lspci: () => ({ type: 'out', text: '00:00.0 Host bridge: Advanced Micro Devices, Inc. [AMD] Renoir/Cezanne Root Complex\n01:00.0 VGA compatible controller: NVIDIA Corporation GA106M [GeForce RTX 3060 Mobile]\n02:00.0 Network controller: Intel Corporation Wi-Fi 6 AX200' }),
  lsusb: () => ({ type: 'out', text: 'Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub\nBus 001 Device 002: ID 046d:c539 Logitech USB Receiver\nBus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub' }),
  kill: (arg) => ({ type: 'ok', text: `Sent SIGTERM to process ${arg || 'PID'}` }),
  pkill: (arg) => ({ type: 'ok', text: `Killed process matching: ${arg || 'pattern'}` }),
  killall: (arg) => ({ type: 'ok', text: `Killed all instances of: ${arg || 'process'}` }),
  tasklist: () => ({
    type: 'out',
    text: [
      'Image Name                     PID Session Name        Session#    Mem Usage',
      '========================= ======== ================ =========== ============',
      'System Idle Process              0 Services                   0          8 K',
      'System                           4 Services                   0        144 K',
      'explorer.exe                  4096 Console                    1     85,420 K',
      'chrome.exe                    5120 Console                    1    142,500 K',
      'code.exe                      6800 Console                    1    198,320 K',
      'spotify.exe                   7240 Console                    1     64,100 K',
    ].join('\n'),
  }),
  taskkill: (arg) => ({ type: 'ok', text: `SUCCESS: The process "${arg || 'task'}" has been terminated.` }),

  // --- NETWORK & WEB ---
  ping: (arg) => {
    const host = arg || 'mikhayl.my.id';
    return {
      type: 'ok',
      text: [
        `PING ${host} (104.21.72.180) 56(84) bytes of data.`,
        `64 bytes from ${host}: icmp_seq=1 ttl=57 time=14.2 ms`,
        `64 bytes from ${host}: icmp_seq=2 ttl=57 time=13.8 ms`,
        `64 bytes from ${host}: icmp_seq=3 ttl=57 time=14.0 ms`,
        `64 bytes from ${host}: icmp_seq=4 ttl=57 time=13.9 ms`,
        `--- ${host} ping statistics ---`,
        '4 packets transmitted, 4 received, 0% packet loss, time 3004ms',
        'rtt min/avg/max/mdev = 13.8/13.97/14.2/0.16 ms',
      ].join('\n'),
    };
  },
  curl: (arg) => ({
    type: 'out',
    text: `HTTP/2 200 OK\nserver: cloudflare\ncontent-type: application/json; charset=utf-8\ndate: ${new Date().toUTCString()}\n\n{"status":"success","message":"Hello from Mikhayl Portfolio API!","target":"${arg || 'localhost'}"}`,
  }),
  wget: (arg) => ({
    type: 'ok',
    text: `--2026-11-08--  ${arg || 'https://mikhayl.my.id/index.html'}\nResolving host... done.\nConnecting... connected.\nHTTP request sent, awaiting response... 200 OK\nLength: 4892 (4.8K) [text/html]\nSaving to: 'index.html' saved [4892/4892]`,
  }),
  ifconfig: () => ({
    type: 'out',
    text: [
      'wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
      '        inet 192.168.1.105  netmask 255.255.255.0  broadcast 192.168.1.255',
      '        inet6 fe80::a1b2:c3d4:e5f6  prefixlen 64  scopeid 0x20<link>',
      '        ether 00:1a:2b:3c:4d:5e  txqueuelen 1000  (Ethernet)',
      '        RX packets 249012  bytes 284192040 (271.0 MiB)',
      '        TX packets 184021  bytes 38491204 (36.7 MiB)',
    ].join('\n'),
  }),
  ipconfig: () => ({
    type: 'out',
    text: [
      'Windows IP Configuration',
      '',
      'Wireless LAN adapter Wi-Fi:',
      '   Connection-specific DNS Suffix  . : home',
      '   IPv4 Address. . . . . . . . . . . : 192.168.1.105',
      '   Subnet Mask . . . . . . . . . . . : 255.255.255.0',
      '   Default Gateway . . . . . . . . . : 192.168.1.1',
    ].join('\n'),
  }),
  ip: (arg) => ({ type: 'out', text: '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN\n    inet 127.0.0.1/8 scope host lo\n2: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP\n    inet 192.168.1.105/24 brd 192.168.1.255 scope global dynamic wlan0' }),
  netstat: () => ({
    type: 'out',
    text: [
      'Active Internet connections (only servers & established)',
      'Proto Recv-Q Send-Q Local Address           Foreign Address         State',
      'tcp        0      0 127.0.0.1:5173          0.0.0.0:*               LISTEN',
      'tcp        0      0 192.168.1.105:443       104.21.72.180:https     ESTABLISHED',
    ].join('\n'),
  }),
  ss: () => COMMAND_HANDLERS.netstat(),
  traceroute: (arg) => ({
    type: 'out',
    text: [
      `traceroute to ${arg || 'mikhayl.my.id'}, 30 hops max, 60 byte packets`,
      ' 1  _gateway (192.168.1.1)  1.214 ms  1.105 ms  1.080 ms',
      ' 2  10.20.30.1 (10.20.30.1)  5.402 ms  5.312 ms  5.290 ms',
      ' 3  cloudflare.net (104.21.72.180)  14.280 ms  14.150 ms  14.020 ms',
    ].join('\n'),
  }),
  tracert: (arg) => COMMAND_HANDLERS.traceroute(arg),
  nslookup: (arg) => ({ type: 'out', text: `Server:\t\t1.1.1.1\nAddress:\t1.1.1.1#53\n\nNon-authoritative answer:\nName:\t${arg || 'mikhayl.my.id'}\nAddress: 104.21.72.180` }),
  dig: (arg) => ({ type: 'out', text: `; <<>> DiG 9.18.18 <<>> ${arg || 'mikhayl.my.id'}\n;; ANSWER SECTION:\n${arg || 'mikhayl.my.id'}.\t300\tIN\tA\t104.21.72.180` }),
  whois: (arg) => ({ type: 'out', text: `Domain Name: ${arg || 'mikhayl.my.id'}\nRegistrar: Rumahweb Indonesia\nStatus: clientTransferProhibited\nName Server: CHLOE.NS.CLOUDFLARE.COM` }),
  ssh: (arg) => ({ type: 'warn', text: `Connecting to ${arg || 'remote-server'}...\nAuthenticated via ed25519 key.\nWelcome to Mikhayl Secure Cloud Shell!` }),
  nmap: (arg) => ({ type: 'ok', text: `Starting Nmap 7.94 scan on ${arg || 'localhost'}...\nPORT     STATE SERVICE\n80/tcp   open  http\n443/tcp  open  https\n5173/tcp open  vite` }),

  // --- GIT & DEV TOOLS ---
  git: (arg) => {
    const a = (arg || '').trim();
    if (!a || a === 'status') {
      return {
        type: 'ok',
        text: [
          'On branch main',
          'Your branch is up to date with \'origin/main\'.',
          '',
          'Changes to be committed:',
          '  (use "git restore --staged <file>..." to unstage)',
          '        modified:   src/components/LinuxTerminal.jsx',
          '        modified:   src/components/SnakeGameModal.jsx',
          '',
          'nothing to commit, working tree clean',
        ].join('\n'),
      };
    }
    if (a.startsWith('log')) {
      return {
        type: 'out',
        text: [
          'commit 7a9b2c3d (HEAD -> main, origin/main)',
          'Author: Mikhayl <mikhayl@dev.id>',
          'Date:   Sat Nov 8 2026',
          '',
          '    feat: expand terminal to 300+ commands & add global snake leaderboard',
          '',
          'commit 1e4f5a6b',
          'Author: Mikhayl <mikhayl@dev.id>',
          'Date:   Fri Nov 7 2026',
          '',
          '    feat: connect supabase guestbook with realtime wall',
        ].join('\n'),
      };
    }
    if (a.startsWith('branch')) return { type: 'out', text: '* main\n  feature/cyberpunk-redesign' };
    if (a.startsWith('commit')) return { type: 'ok', text: '[main 8f1e2d3] ' + (a.replace('commit', '').trim() || 'update portfolio code') };
    if (a.startsWith('push')) return { type: 'ok', text: 'To https://github.com/Mikhayl-05/Portofolio.git\n   1e4f5a6..7a9b2c3  main -> main\nDone!' };
    if (a.startsWith('pull')) return { type: 'ok', text: 'Already up to date.' };
    return { type: 'out', text: `git: '${a}' is executed successfully in portfolio repository.` };
  },

  npm: (arg) => ({ type: 'ok', text: `added 1 package, and audited 142 packages in 1s\nfound 0 vulnerabilities` }),
  npx: (arg) => ({ type: 'ok', text: `npx: executing package ${arg || 'tool'}... done!` }),
  node: (arg) => ({ type: 'out', text: `Welcome to Node.js v20.11.1.\nType ".help" for more information.` }),
  python: (arg) => ({ type: 'out', text: `Python 3.12.2 (main, Feb 20 2026, 12:00:00) [GCC 13.2.0] on linux\nType "help", "copyright", "credits" or "license" for more information.` }),
  python3: (arg) => COMMAND_HANDLERS.python(arg),
  py: (arg) => COMMAND_HANDLERS.python(arg),
  pip: (arg) => ({ type: 'ok', text: `Requirement already satisfied: ${arg || 'package'} in /usr/lib/python3.12/site-packages` }),
  pip3: (arg) => COMMAND_HANDLERS.pip(arg),
  docker: (arg) => ({
    type: 'out',
    text: [
      'CONTAINER ID   IMAGE                 COMMAND                  STATUS         PORTS',
      'a1b2c3d4e5f6   mikhayl/portfolio:v3  "npm run preview"        Up 42 hours    0.0.0.0:80->80/tcp',
    ].join('\n'),
  }),
  cargo: (arg) => ({ type: 'ok', text: '   Compiling portfolio-engine v0.3.0\n    Finished release [optimized] target(s) in 1.42s' }),
  rustc: () => ({ type: 'out', text: 'rustc 1.77.0 (aedd173a2 2026-03-17)' }),
  go: (arg) => ({ type: 'out', text: 'go version go1.22.1 linux/amd64' }),
  gcc: () => ({ type: 'out', text: 'gcc (GCC) 13.2.1 2026' }),
  make: () => ({ type: 'ok', text: 'make: Nothing to be done for \'all\'.' }),
  code: () => ({ type: 'ok', text: 'Opening Visual Studio Code in current directory...' }),
  vim: () => ({ type: 'info', text: 'Vim 9.1: Tip: Ketik ":q!" lalu Enter untuk keluar dari Vim 😉' }),
  vi: () => COMMAND_HANDLERS.vim(),
  nano: () => ({ type: 'info', text: 'GNU nano 7.2: File editor loaded. Tekan Ctrl+X untuk keluar.' }),
  notepad: () => ({ type: 'ok', text: 'Launching Notepad.exe...' }),

  // --- PACKAGE MANAGERS ---
  apt: () => ({ type: 'ok', text: 'Reading package lists... Done\nBuilding dependency tree... Done\nAll packages are up to date.' }),
  'apt-get': () => COMMAND_HANDLERS.apt(),
  pacman: () => ({ type: 'ok', text: ':: Synchronizing package databases...\n core is up to date\n extra is up to date\n there is nothing to do' }),
  dnf: () => ({ type: 'ok', text: 'Last metadata expiration check: 0:42:00 ago. Dependencies resolved. Nothing to do.' }),
  yum: () => COMMAND_HANDLERS.dnf(),
  brew: () => ({ type: 'ok', text: 'Your system is ready to brew.' }),
  winget: () => ({ type: 'ok', text: 'Windows Package Manager v1.7 - All packages up to date.' }),
  choco: () => ({ type: 'ok', text: 'Chocolatey v2.2.2 - 0 packages need updates.' }),

  // --- WINDOWS COMMANDS & UTILITIES ---
  systeminfo: () => ({
    type: 'out',
    text: [
      'Host Name:                 PORTFOLIO-PC',
      'OS Name:                   Microsoft Windows 11 Pro',
      'OS Version:                10.0.22631 N/A Build 22631',
      'System Manufacturer:       Cyberpunk Studio',
      'System Type:               x64-based PC',
      'Total Physical Memory:     16,384 MB',
      'Available Memory:          8,420 MB',
    ].join('\n'),
  }),
  ver: () => ({ type: 'out', text: 'Microsoft Windows [Version 10.0.22631.3296]' }),
  vol: () => ({ type: 'out', text: 'Volume in drive C is PORTFOLIO_DISK\nVolume Serial Number is 42E0-2026' }),
  powershell: () => ({ type: 'info', text: 'Windows PowerShell\nCopyright (C) Microsoft Corporation. All rights reserved.\nPS C:\\Users\\Mikhayl>' }),
  cmd: () => ({ type: 'info', text: 'Microsoft Windows [Version 10.0.22631]\n(c) Microsoft Corporation. All rights reserved.\nC:\\Users\\Mikhayl>' }),
  chkdsk: () => ({ type: 'ok', text: 'Windows has scanned the file system and found no problems.\nNo further action is required.' }),
  sfc: () => ({ type: 'ok', text: 'Windows Resource Protection did not find any integrity violations.' }),
  diskpart: () => ({ type: 'warn', text: 'Microsoft DiskPart version 10.0.22631.1\nDISKPART> Listing drives: NVMe SSD 1TB (Healthy, GPT)' }),
  getmac: () => ({ type: 'out', text: 'Physical Address    Transport Name\n=================== ====================================================\n00-1A-2B-3C-4D-5E   \\Device\\Tcpip_{A1B2C3D4-E5F6-7890}' }),
  attrib: () => ({ type: 'out', text: 'A            C:\\Users\\Mikhayl\\about.txt\n  SHR        C:\\Users\\Mikhayl\\secret_vault.gpg' }),
  robocopy: () => ({ type: 'ok', text: 'ROBOCOPY :: Robust File Copy for Windows\nDirs : 1  Files : 4  Bytes : 13.8 k  Times : 0:00:00' }),
  cipher: () => ({ type: 'ok', text: 'U about.txt\nE secret_vault.gpg (Encrypted)' }),

  // --- COMPRESSION & ARCHIVE ---
  tar: () => ({ type: 'ok', text: 'tar: archive operation completed without errors.' }),
  zip: () => ({ type: 'ok', text: 'updating: portfolio_backup.zip (deflated 65%)' }),
  unzip: () => ({ type: 'ok', text: 'Archive:  portfolio.zip\n  inflating: index.html\n  inflating: assets/app.js' }),
  gzip: () => ({ type: 'ok', text: 'Compressed using gzip (ratio: 72.4%)' }),
  gunzip: () => ({ type: 'ok', text: 'Decompressed gzip archive.' }),
  '7z': () => ({ type: 'ok', text: '7-Zip 23.01 (x64) : Everything is Ok' }),

  // --- CRYPTO & CHECKSUMS ---
  md5sum: (arg) => ({ type: 'out', text: `7b52009b64fd0a2a49e6d8a939753077  ${arg || 'file.txt'}` }),
  sha256sum: (arg) => ({ type: 'out', text: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  ${arg || 'file.txt'}` }),
  base64: (arg) => ({ type: 'out', text: 'TWlraGF5bCBQb3J0Zm9saW8gMjAyNiAtIENvZGluZyBpcyBBcnQh' }),
  gpg: () => ({ type: 'warn', text: 'gpg: 2048-bit RSA key valid. Signature verified successfully.' }),

  // --- FUN & EASTER EGGS ---
  cowsay: (arg) => {
    const msg = arg || 'Mikhayl: Belajar komputer bikin elu keliatan keren!';
    const border = '-'.repeat(msg.length + 2);
    return {
      type: 'ascii',
      text: [
        ` ${border}`,
        `< ${msg} >`,
        ` ${border}`,
        '        \\   ^__^',
        '         \\  (oo)\\_______',
        '            (__)\\       )\\/\\',
        '                ||----w |',
        '                ||     ||',
      ].join('\n'),
    };
  },
  fortune: () => {
    const quotes = [
      '"Komputer tidak pernah salah, yang salah programmernya." — Anonim',
      '"Ada 10 jenis orang di dunia: yang paham biner, dan yang tidak." — Geek Quote',
      '"Talk is cheap. Show me the code." — Linus Torvalds',
      '"Stay hungry, stay foolish." — Steve Jobs',
      '"Belajar komputer bikin elu keliatan keren." — Mikhayl',
    ];
    return { type: 'info', text: quotes[Math.floor(Math.random() * quotes.length)] };
  },
  sl: () => ({
    type: 'ascii',
    text: [
      '      ====        ________                ___________ ',
      '  _D _|  |_______/        \\__I_I_____===__|_________| ',
      '   |(_)---  |   H\\________/ _____ |   (|) |         | ',
      '   /     |  |   H  |  |     |   | |     | |         | ',
      '  |      |  |   H  |__--------------------| [CHOO-CHOO] ',
      ' --------/  /________________________________________ ',
      '   @-@-@-@  @-@-@-@   @-@-@-@                  @-@-@-@',
    ].join('\n'),
  }),
  cmatrix: () => ({ type: 'ok', text: '🕶️ Membuka visual Matrix Rain... (Coba juga ketik perintah "matrix")' }),
  lolcat: (arg) => ({ type: 'ok', text: `🌈 [Rainbow Output]: ${arg || 'Vibrant Cyberpunk Colors Loaded!'}` }),
  figlet: (arg) => ({
    type: 'ascii',
    text: [
      ' __  __ _____ _  ___   _     __   ___   _',
      '|  \\/  |_   _| |/ / | | |   / /  / _ \\ / |',
      '| |\\/| | | | | \' /| |_| |  / /  | | | || |',
      '| |  | | | | | . \\|  _  | / /   | |_| || |',
      '|_|  |_| |_| |_|\\_\\_| |_|/_/     \\___(_)_|',
    ].join('\n'),
  }),
  banner: (arg) => COMMAND_HANDLERS.figlet(arg),
  hack: () => ({
    type: 'warn',
    text: [
      'Connecting to Satellite Uplink 0x7F...',
      'Bypassing Pentagon Firewall [OK]',
      'Downloading NSA Secret Algorithms [OK]',
      'Access Granted: Welcome, Agent Mikhayl! 🕶️🚀',
    ].join('\n'),
  }),
  sudo: (arg) => {
    if (arg?.includes('rm') && arg?.includes('-rf')) {
      return {
        type: 'warn',
        text: '🚨 PERMISSION DENIED: Nice try, hacker! System files are immutable and protected by Mikhayl\'s firewall. 😎',
      };
    }
    return {
      type: 'ok',
      text: `[sudo] password for mikhayl: ••••••••\nExecuting root privilege task: ${arg || 'complete'} ✓`,
    };
  },
  konami: () => ({ type: 'ok', text: '🎮 KONAMI CODE DETECTED: ↑ ↑ ↓ ↓ ← → ← → B A! 30 Extra Lives Granted!' }),
  mikhayl: () => ({
    type: 'ok',
    text: 'Halo! Saya Mikhayl. Senang kamu mengeksplorasi terminal portfolio ini. Ada banyak rahasia di sini!',
  }),
  siapacewekitu: () => ({ type: 'info', text: '🤫 Rahasia negara... Hanya Mikhayl dan Tuhan yang tahu!' }),
  crush: () => ({ type: 'info', text: '❤️ 404: Crush not found in public database. Privileged access required.' }),
  sayangku: () => ({ type: 'info', text: '💖 Eaaa... Nyari siapa hayo? Fokus ngoding dulu bro!' }),
  fineshyt: () => ({ type: 'ok', text: '✨ Aesthetic vibes always 100% fine.' }),
  oshi: () => ({ type: 'info', text: '⭐ Oshi tersimpan rapi di dalam partisi terenkripsi!' }),
  bored: () => ({ type: 'ok', text: 'Bosan? Coba ketik "snake" untuk main game ular atau "cowsay halo"!' }),
  coffee: () => ({ type: 'ok', text: '☕ Secangkir Kopi Hitam Panas siap menemani sesi ngoding malammu.' }),
  tea: () => ({ type: 'ok', text: '🍵 Teh hangat menenangkan pikiran.' }),
  rickroll: () => ({ type: 'ok', text: '🎵 Never gonna give you up, never gonna let you down... 🕺' }),
};

// Fill up aliases and common CLI utility names to reach 300+ total recognized commands
const EXPANDED_COMMANDS_LIST = [
  // Additional Unix utilities (100+)
  'echo', 'printf', 'read', 'export', 'env', 'printenv', 'set', 'unset', 'alias', 'unalias',
  'source', 'eval', 'exec', 'exit', 'quit', 'logout', 'clear', 'cls', 'reset', 'history',
  'sleep', 'time', 'timeout', 'wait', 'true', 'false', 'yes', 'seq', 'test', 'expr', 'bc',
  'cut', 'sort', 'uniq', 'diff', 'patch', 'tr', 'sed', 'awk', 'strings', 'xxd', 'hexdump',
  'split', 'paste', 'join', 'fold', 'tee', 'column', 'comm', 'csplit', 'expand', 'unexpand',
  'fmt', 'nl', 'pr', 'shuf', 'tac', 'rev', 'od', 'nohup', 'nice', 'renice', 'strace', 'watch',
  'lsof', 'fuser', 'jobs', 'bg', 'fg', 'disown', 'chown', 'chmod', 'chgrp', 'umask', 'passwd',
  'useradd', 'userdel', 'usermod', 'groupadd', 'groupdel', 'groups', 'su', 'sudo', 'visudo',
  'systemctl', 'journalctl', 'service', 'init', 'shutdown', 'reboot', 'poweroff', 'halt',
  'crontab', 'at', 'batch', 'anacron', 'dmesg', 'sysctl', 'modprobe', 'lsmod', 'insmod', 'rmmod',
  'blkid', 'fdisk', 'parted', 'mkfs', 'fsck', 'mount', 'umount', 'eject', 'losetup', 'sync',
  
  // Windows CLI tools & aliases (60+)
  'attrib', 'cacls', 'chkdsk', 'chkntfs', 'cipher', 'comp', 'compact', 'convert', 'defrag',
  'diskpart', 'driverquery', 'fc', 'findstr', 'format', 'fsutil', 'gpresult', 'gpupdate',
  'helpctr', 'ipconfig', 'label', 'mode', 'more', 'mountvol', 'net', 'netstat', 'path',
  'pause', 'ping', 'powercfg', 'print', 'prompt', 'recover', 'reg', 'replace', 'robocopy',
  'sc', 'schtasks', 'sfc', 'shutdown', 'sort', 'subst', 'systeminfo', 'taskkill', 'tasklist',
  'tree', 'type', 'ver', 'vol', 'xcopy', 'powershell', 'cmd', 'wmic', 'winget', 'clink',

  // Dev tools & programming runtimes (60+)
  'git', 'svn', 'hg', 'docker', 'podman', 'kubectl', 'minikube', 'helm', 'terraform',
  'ansible', 'vagrant', 'npm', 'npx', 'yarn', 'pnpm', 'bun', 'deno', 'node', 'nodemon',
  'python', 'python3', 'pip', 'pip3', 'poetry', 'conda', 'virtualenv', 'rustc', 'cargo',
  'rustup', 'go', 'gofmt', 'gcc', 'g++', 'clang', 'clang++', 'make', 'cmake', 'ninja',
  'mvn', 'gradle', 'java', 'javac', 'kotlinc', 'dotnet', 'ruby', 'gem', 'bundle', 'php',
  'composer', 'perl', 'lua', 'bash', 'zsh', 'fish', 'sh', 'ksh', 'tcsh', 'csh',

  // Network & diagnostic tools (40+)
  'curl', 'wget', 'http', 'ssh', 'scp', 'sftp', 'rsync', 'telnet', 'ftp', 'nc', 'netcat',
  'socat', 'nmap', 'tcpdump', 'wireshark', 'tshark', 'traceroute', 'tracert', 'tracepath',
  'mtr', 'ping', 'arp', 'arping', 'route', 'ip', 'ifconfig', 'iwconfig', 'ethtool', 'mii-tool',
  'host', 'dig', 'nslookup', 'whois', 'netstat', 'ss', 'iftop', 'nethogs', 'iptraf', 'bmon',

  // Fun, easter eggs & portfolio specific (50+)
  'snake', 'matrix', 'music', 'theme', 'about', 'contact', 'skills', 'projects', 'pameran',
  'github', 'neofetch', 'fastfetch', 'screenfetch', 'pfetch', 'cowsay', 'fortune', 'sl',
  'cmatrix', 'lolcat', 'figlet', 'banner', 'toilet', 'nyancat', 'hack', 'matrix2', 'arcade',
  'mikhayl', 'surabaya', 'gorontalo', 'jakarta', 'pesantren', 'siapacewekitu', 'crush',
  'sayangku', 'fineshyt', 'oshi', 'bored', 'coffee', 'tea', 'rickroll', 'konami', 'love',
  'alien', 'nuke', 'illuminati', 'sudo rm -rf /', 'rm -rf /', ':(){ :|:& };:'
];

// Deduplicate all commands to create autocomplete array
export const ALL_COMMANDS = Array.from(new Set([
  ...Object.keys(COMMAND_HANDLERS),
  ...EXPANDED_COMMANDS_LIST,
])).sort();

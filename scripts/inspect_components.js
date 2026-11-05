const fs = require('fs');

const code = fs.readFileSync('test_nexprobyte_bundle.js', 'utf8');

const components = [
  { name: '_c (Home)', symbol: 'function _c(' },
  { name: 'bc (About)', symbol: 'function bc(' },
  { name: 'wc (Services)', symbol: 'function wc(' },
  { name: 'Cc (Service Detail)', symbol: 'function Cc(' },
  { name: 'Ec (Blog)', symbol: 'function Ec(' },
  { name: 'jc (Blog Detail)', symbol: 'function jc(' },
  { name: 'Sc (Careers)', symbol: 'function Sc(' },
  { name: 'Pc (Career Detail)', symbol: 'function Pc(' },
  { name: 'yi (Career Apply)', symbol: 'function yi(' },
  { name: 'Ac (Interview Data)', symbol: 'function Ac(' },
  { name: 'kc (Contact)', symbol: 'function kc(' }
];

components.forEach(cmp => {
  const idx = code.indexOf(cmp.symbol);
  console.log(`\n================== ${cmp.name} ==================`);
  console.log(`Index: ${idx}`);
  if (idx !== -1) {
    // print first 1500 characters of the component
    console.log(code.substring(idx, Math.min(code.length, idx + 2000)));
  }
});


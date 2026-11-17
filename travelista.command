#!/bin/zsh
set -u
cd "$(dirname "$0")" || { echo "Travelista klasörü açılamadı."; exit 1; }
if [ ! -d node_modules ]; then
  echo "Bağımlılıklar hazırlanıyor…"
  npm install || { echo "Bağımlılıklar yüklenemedi. İnternet bağlantınızı kontrol edin."; exit 1; }
fi

# Travelista zaten çalışıyorsa ikinci bir Vite süreci başlatma. strictPort açıkken
# ikinci süreç anında kapanır ve kullanıcıda bağlantı sorunu varmış gibi görünür.
if curl --silent --fail --max-time 2 http://127.0.0.1:3000/ >/dev/null 2>&1; then
  echo "Travelista zaten http://localhost:3000 adresinde çalışıyor."
  open -a "Google Chrome" http://localhost:3000
  exit 0
fi

echo "Travelista http://localhost:3000 adresinde başlatılıyor…"
npm run dev &
SERVER_PID=$!
for i in {1..60}; do
  if ! kill -0 $SERVER_PID 2>/dev/null; then echo "Geliştirme sunucusu beklenmedik biçimde durdu."; wait $SERVER_PID; exit $?; fi
  if nc -z 127.0.0.1 3000 >/dev/null 2>&1; then open -a "Google Chrome" http://localhost:3000; wait $SERVER_PID; exit $?; fi
  sleep 1
done
echo "Sunucu 60 saniye içinde hazır olmadı."; kill $SERVER_PID 2>/dev/null; exit 1

import cn from 'classnames'
import React, { useEffect, useState } from 'react'

import ShareButton from './share-button'
import styles from './styles/footer.css'

const title = 'Shortstories. Стань лучшим автором'

function Footer({ className = '' }) {
  const [origin, setOrigin] = useState(null)
  useEffect(() => {
    setOrigin(window.location.origin)
  }, [origin])
  return (
    <footer className={cn(styles.footer, className)}>
      <div className={styles.bar}>
        <div className={styles.copyright}>
          <div>
            Канал о проекте:{' '}
            <a
              href="tg://resolve?domain=fash_it"
              rel="noopener noreferrer"
              target="_blank"
            >
              ФЭШ
            </a>
          </div>
        </div>
        <div className={styles.share}>
          <ShareButton
            href="https://vk.com/shortstories_io"
            icon="/images/icons/vk.svg"
            title="Группа ВК"
          />
          <ShareButton
            href={`https://twitter.com/intent/tweet/?text=${title}&url=${origin}`}
            icon="/images/icons/twitter.svg"
            title="Поделиться в Twitter"
          />
          <ShareButton
            href={`https://telegram.me/share/url?url=${origin}&text=${title}&utm_source=share2`}
            icon="/images/icons/telegram.svg"
            title="Поделиться в Telegram"
          />
          <ShareButton
            href={`https://www.facebook.com/sharer/sharer.php?u=${origin}&t=${title}`}
            icon="/images/icons/fb.svg"
            title="Поделиться в Facebook"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer

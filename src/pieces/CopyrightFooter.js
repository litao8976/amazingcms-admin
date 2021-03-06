import React from 'react'

const CopyrightFooter = (props) => (
  <div style={{ textAlign: 'center' }}>
    Made with a
    <svg
      style={{ position: 'relative', top: '4px', margin: '0 0.3rem' }}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      hint="keyboard"
      viewBox="0 0 24 24"
    >
      {/* eslint-disable-next-line max-len */}
      <path d="M22 7v10h-20v-10h20zm2-2h-24v14h24v-14zm-18 3h-3v2h3v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm-4 6h-10v2h10v-2zm4-3h-4v2h4v-2zm-14 0h-4v2h4v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2z"></path>
    </svg>
    by <a href="https://amazingdesign.eu/" target="_blank" rel="noopener noreferrer">Amazing Design</a>
  </div>
)

export default CopyrightFooter
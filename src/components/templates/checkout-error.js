import ButtonFilled from '@/components/atoms/button-filled'

export default function Error({ order }) {
  return (
    <div className='container'>
      <svg className="background error" width="653" height="709" viewBox="0 0 653 709" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M315.124 120.936L267.005 148.282C264.678 144.93 262.334 141.631 259.948 138.336C257.733 135.312 255.498 132.3 253.264 129.298L249.768 131.183L241.012 135.971L216.343 149.374L208.935 153.37L203.804 156.167C204.377 156.932 204.972 157.706 205.556 158.47C207.663 161.229 209.749 163.989 211.806 166.773C214.053 169.805 216.238 172.843 218.412 175.891L175.738 200.15L165.485 205.975C164.481 206.601 163.463 207.174 162.4 207.73L162.149 207.889C137.523 221.172 109.592 222.411 85.1862 213.58C75.6322 210.159 66.6223 205.189 58.546 198.776C66.4307 205.914 74.7618 212.464 83.4328 218.413C86.8926 220.792 90.3863 223.072 93.9463 225.263C123.543 242.498 155.084 253.658 187.074 259.08C187.202 259.101 187.32 259.123 187.448 259.133C198.108 260.779 208.858 261.74 219.669 261.946C219.682 261.849 219.673 261.744 219.676 261.649C220.299 246.457 224.531 231.558 232.16 218.419C232.666 217.541 233.195 216.681 233.745 215.82L233.78 215.859C235.541 212.96 237.478 210.151 239.586 207.486C239.946 207.984 240.253 208.486 240.594 209.007C249.838 223.746 258.575 238.866 266.704 254.292C267.249 255.345 267.8 256.345 268.311 257.379C268.868 258.452 269.434 259.503 269.97 260.578C271.63 263.787 273.269 267.009 274.877 270.233C274.879 270.254 274.892 270.284 274.892 270.284C294.513 309.783 310.367 351.104 321.943 393.205C324.932 403.922 327.074 415.601 329.409 427.929C330.051 431.352 330.7 434.859 331.383 438.395L344.708 449.433C344.708 449.433 344.448 427.138 344.814 427.339C345.16 427.542 372.896 456.26 374.719 458.165C374.753 458.194 374.776 458.213 374.788 458.233L374.822 458.262L351.767 391.856L384.041 417.394C381.541 403.992 379.154 391.298 375.619 378.418C370.344 359.279 364.249 340.327 357.389 321.568C356.596 319.469 355.826 317.389 355.052 315.266C346.374 292.191 336.564 269.476 325.627 247.313C324.502 245.041 323.366 242.76 322.22 240.49C311.056 218.388 298.776 196.836 285.518 175.961C285.469 175.88 285.446 175.861 285.384 175.75C285.713 175.637 286.138 175.538 286.479 175.445C320.971 165.028 358.631 175.431 382.85 202.081C383.222 202.483 383.597 202.906 383.938 203.31C386.783 206.534 389.436 209.986 391.845 213.67C392.972 215.35 394.03 217.088 395.038 218.862C408.564 242.622 410.564 269.801 402.871 293.929L404.583 294.407L423.973 299.735L445.592 305.654L463.363 310.581C473.098 289.323 479.754 266.795 483.111 243.651C483.832 238.737 484.437 233.822 484.893 228.909C485.174 225.142 485.436 221.293 485.588 217.516C485.884 210.101 485.861 202.671 485.448 195.253C484.619 178.293 481.957 161.278 477.479 144.534C475.967 138.849 474.236 133.204 472.297 127.598C468.337 116.16 463.47 104.884 457.672 93.8355C457.161 92.9278 456.725 92.0348 456.213 91.1271C455.358 89.5299 454.461 87.9469 453.573 86.342C447.135 74.9891 439.895 64.3921 431.966 54.5096L315.124 120.936Z" fill="rgba(204, 196, 196, 0.15)" />
        <path d="M346.272 463.635L319.561 458.87L295.486 470.446L320.749 465.461L336.925 468.304L346.272 463.635Z" fill="rgba(204, 196, 196, 0.15)" />
        <path d="M364.962 474.721L345.237 487.098L330.445 503.747L360.312 494.498L364.962 474.721Z" fill="rgba(204, 196, 196, 0.15)" />
        <path d="M404.432 421.178L436.718 423.763L444.248 408.73L433.472 418.691L404.432 421.178Z" fill="rgba(204, 196, 196, 0.15)" />
        <path d="M396.776 412.794L400.932 405.038L397.551 393.698L390.961 403.777L396.776 412.794Z" fill="rgba(204, 196, 196, 0.15)" />
        <path d="M397.359 449.334C406.013 458.044 415.052 467.314 419.264 472.419L419.266 472.451L424.435 477.875L382.942 463.572C383.619 464.687 385.017 467.306 386.486 470.267L386.488 470.288L393.598 483.698L374.916 478.489L373.476 478.094C373.666 478.342 373.845 478.581 374.037 478.839L463.148 560.342C463.148 560.342 492.44 578.83 494.235 579.786C494.268 579.805 494.29 579.813 494.302 579.823L494.303 579.834L593.292 622.114C596.462 612.466 598.563 602.306 599.51 591.758C600.287 583.044 600.226 574.433 599.399 566.004L514.53 526.775L483.908 507.692L413.592 438.895C413.581 438.895 413.58 438.885 413.58 438.885L377.893 428.799L397.359 449.334Z" fill="rgba(204, 196, 196, 0.15)" />
      </svg>
      <div className='content'>
        <h1>PŁATNOŚĆ NIEUDANA</h1>
        <p className='text'>
          ZAMÓWIENIE NR: <strong>{order}</strong><br />
            NIESTETY PŁATNOŚĆ NIEUDANA, prosimy spróbuj ponownie.
        </p>
        <ButtonFilled href='/'>
          POWRÓT DO KOSZYKA
        </ButtonFilled>
      </div>
    </div>
  )
}
import React from 'react';

export function iconForKey(iconKey: string | undefined): React.ReactNode {
  if (!iconKey) return null;

  switch (iconKey) {
    // AIEvolution cards
    case 'aiEvolution':
      return (
        <svg width="48" height="53" viewBox="0 0 48 53" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M18.4001 30.7041H9.6001V21.9041H18.4001V30.7041ZM11.2001 29.1041H16.8001V23.5041H11.2001V29.1041Z" fill="currentColor"/>
          <path d="M30.3991 30.7041H21.6001V21.9041H30.3991V30.7041ZM23.2001 29.1041H28.8001V23.5041H23.2001V29.1041Z" fill="currentColor"/>
          <path d="M42.3991 30.7041H33.6001V21.9041H42.3991V30.7041ZM35.2001 29.1041H40.8001V23.5041H35.2001V29.1041Z" fill="currentColor"/>
          <path d="M18.4001 42.7041H9.6001V33.9041H18.4001V42.7041ZM11.2001 41.1041H16.8001V35.5041H11.2001V41.1041Z" fill="currentColor"/>
          <path d="M30.3991 42.7041H21.6001V33.9041H30.3991V42.7041ZM23.2001 41.1041H28.8001V35.5041H23.2001V41.1041Z" fill="currentColor"/>
          <path d="M42.3991 42.7041H33.6001V33.9041H42.3991V42.7041ZM35.2001 41.1041H40.8001V35.5041H35.2001V41.1041Z" fill="currentColor"/>
          <path d="M42.3991 17.104H9.6001V18.704H42.3991V17.104Z" fill="currentColor"/>
          <path d="M18.6459 13.409L17.2959 12.55L17.7259 11.875C19.7249 8.734 19.7249 4.675 17.7259 1.534L17.2959 0.859L18.6459 0L19.0749 0.675C21.4059 4.338 21.4059 9.071 19.0749 12.735L18.6459 13.409Z" fill="currentColor"/>
          <path d="M22.394 7.50405H34.339C34.392 6.97205 34.392 6.43705 34.339 5.90405H22.394C22.427 6.43705 22.427 6.97105 22.394 7.50405Z" fill="currentColor"/>
          <path d="M43.2001 5.90405H39.163C39.196 6.43705 39.196 6.97105 39.163 7.50405H43.2001C44.5231 7.50405 45.6 8.58105 45.6 9.90405V43.5041C45.6 44.8271 44.5231 45.9041 43.2001 45.9041H8.80005C7.47705 45.9041 6.40005 44.8271 6.40005 43.5041V9.90405C6.40005 8.58105 7.47705 7.50405 8.80005 7.50405H17.57C17.623 6.97205 17.623 6.43705 17.57 5.90405H8.80005C6.59405 5.90405 4.80005 7.69805 4.80005 9.90405V43.5041C4.80005 45.7101 6.59405 47.5041 8.80005 47.5041H43.2001C45.4061 47.5041 47.2001 45.7101 47.2001 43.5041V9.90405C47.2001 7.69905 45.4061 5.90405 43.2001 5.90405Z" fill="currentColor"/>
          <path d="M35.414 13.409L34.064 12.55L34.494 11.875C36.493 8.734 36.493 4.675 34.494 1.534L34.064 0.859L35.414 0L35.844 0.675C38.175 4.338 38.175 9.071 35.844 12.735L35.414 13.409Z" fill="currentColor"/>
          <path d="M42.399 52.304H4C1.794 52.304 0 50.51 0 48.304V10.704H1.6V48.304C1.6 49.627 2.677 50.704 4 50.704H42.399V52.304Z" fill="currentColor"/>
        </svg>
      );

    case 'aiMastercard':
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M27.466 8H25.866V12.266H27.466V8Z" fill="currentColor"/>
          <path d="M32.7999 8H31.2V12.266H32.7999V8Z" fill="currentColor"/>
          <path d="M38.133 8H36.533V12.266H38.133V8Z" fill="currentColor"/>
          <path d="M22.133 8H20.533V12.266H22.133V8Z" fill="currentColor"/>
          <path d="M43.466 8H41.866V12.266H43.466V8Z" fill="currentColor"/>
          <path d="M27.466 51.733H25.866V56H27.466V51.733Z" fill="currentColor"/>
          <path d="M32.7999 51.733H31.2V56H32.7999V51.733Z" fill="currentColor"/>
          <path d="M38.133 51.733H36.533V56H38.133V51.733Z" fill="currentColor"/>
          <path d="M22.133 51.733H20.533V56H22.133V51.733Z" fill="currentColor"/>
          <path d="M43.466 51.733H41.866V56H43.466V51.733Z" fill="currentColor"/>
          <path d="M56 25.866H51.7271V27.466H56V25.866Z" fill="currentColor"/>
          <path d="M56 31.2H51.7271V32.7999H56V31.2Z" fill="currentColor"/>
          <path d="M56 36.533H51.7271V38.133H56V36.533Z" fill="currentColor"/>
          <path d="M56 20.533H51.7271V22.133H56V20.533Z" fill="currentColor"/>
          <path d="M56 41.866H51.7271V43.466H56V41.866Z" fill="currentColor"/>
          <path d="M12.259 25.866H8V27.466H12.259V25.866Z" fill="currentColor"/>
          <path d="M12.259 31.2H8V32.7999H12.259V31.2Z" fill="currentColor"/>
          <path d="M12.259 36.533H8V38.133H12.259V36.533Z" fill="currentColor"/>
          <path d="M12.259 20.533H8V22.133H12.259V20.533Z" fill="currentColor"/>
          <path d="M12.259 41.866H8V43.466H12.259V41.866Z" fill="currentColor"/>
          <path d="M46.3259 50.133H17.6589C15.5629 50.133 13.8589 48.429 13.8589 46.333V17.666C13.8589 15.57 15.5629 13.866 17.6589 13.866H46.3259C48.4219 13.866 50.1259 15.57 50.1259 17.666V46.333C50.1259 48.429 48.4219 50.133 46.3259 50.133ZM17.6589 15.466C16.4459 15.466 15.4589 16.453 15.4589 17.666V46.333C15.4589 47.546 16.4459 48.533 17.6589 48.533H46.3259C47.5389 48.533 48.5259 47.546 48.5259 46.333V17.666C48.5259 16.453 47.5389 15.466 46.3259 15.466H17.6589Z" fill="currentColor"/>
          <path d="M36.7749 39.8559C32.4429 39.8559 28.9189 36.3319 28.9189 31.9999C28.9189 27.6669 32.4429 24.1429 36.7749 24.1429C41.1079 24.1429 44.6319 27.6669 44.6319 31.9999C44.6329 36.3319 41.1079 39.8559 36.7749 39.8559ZM36.7749 25.7419C33.3249 25.7419 30.5179 28.5499 30.5179 31.9999C30.5179 35.4499 33.3249 38.2569 36.7749 38.2569C40.2249 38.2569 43.0329 35.4499 43.0329 31.9999C43.0329 28.5499 40.2259 25.7419 36.7749 25.7419Z" fill="currentColor"/>
          <path d="M27.366 39.7279C23.069 39.7279 19.574 36.2319 19.574 31.9349C19.574 27.6379 23.069 24.1429 27.366 24.1429C31.663 24.1429 35.158 27.6379 35.158 31.9349C35.158 36.2319 31.663 39.7279 27.366 39.7279ZM27.366 25.7419C23.952 25.7419 21.174 28.5199 21.174 31.9339C21.174 35.3489 23.952 38.1269 27.366 38.1269C30.78 38.1269 33.558 35.3489 33.558 31.9339C33.559 28.5209 30.78 25.7419 27.366 25.7419Z" fill="currentColor"/>
        </svg>
      );

    case 'aiAig':
      return (
        <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M17.393 0H15.793V3.525H17.393V0Z" fill="currentColor"/>
          <path d="M22.133 0H20.533V3.525H22.133V0Z" fill="currentColor"/>
          <path d="M26.8739 0H25.2739V3.525H26.8739V0Z" fill="currentColor"/>
          <path d="M12.652 0H11.052V3.525H12.652V0Z" fill="currentColor"/>
          <path d="M31.6139 0H30.0139V3.525H31.6139V0Z" fill="currentColor"/>
          <path d="M17.393 39.142H15.793V42.667H17.393V39.142Z" fill="currentColor"/>
          <path d="M22.133 39.142H20.533V42.667H22.133V39.142Z" fill="currentColor"/>
          <path d="M26.8739 39.142H25.2739V42.667H26.8739V39.142Z" fill="currentColor"/>
          <path d="M12.652 39.142H11.052V42.667H12.652V39.142Z" fill="currentColor"/>
          <path d="M31.6139 39.142H30.0139V42.667H31.6139V39.142Z" fill="currentColor"/>
          <path d="M42.667 15.793H39.135V17.393H42.667V15.793Z" fill="currentColor"/>
          <path d="M42.667 20.533H39.135V22.133H42.667V20.533Z" fill="currentColor"/>
          <path d="M42.667 25.275H39.135V26.875H42.667V25.275Z" fill="currentColor"/>
          <path d="M42.667 11.052H39.135V12.652H42.667V11.052Z" fill="currentColor"/>
          <path d="M42.667 30.016H39.135V31.616H42.667V30.016Z" fill="currentColor"/>
          <path d="M3.52 15.793H0V17.393H3.52V15.793Z" fill="currentColor"/>
          <path d="M3.52 20.533H0V22.133H3.52V20.533Z" fill="currentColor"/>
          <path d="M3.52 25.275H0V26.875H3.52V25.275Z" fill="currentColor"/>
          <path d="M3.52 11.052H0V12.652H3.52V11.052Z" fill="currentColor"/>
          <pawidth="29" height="42" viewBox="0 0 29 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14.145 24.355C7.43 24.355 1.968 18.893 1.968 12.178C1.968 5.463 7.43 0 14.145 0C20.86 0 26.323 5.463 26.323 12.178C26.323 18.892 20.86 24.355 14.145 24.355ZM14.145 1.6C8.312 1.6 3.567 6.346 3.567 12.178C3.567 18.01 8.312 22.755 14.145 22.755C19.978 22.755 24.723 18.01 24.723 12.178C24.723 6.345 19.978 1.6 14.145 1.6Z" fill="#FF671B"/>
          <path d="M23.291 22.452C22.863 22.833 22.419 23.195 21.946 23.521L25.564 35.278L21.844 33.136L19.973 36.998L16.507 25.736C15.977 25.828 15.437 25.886 14.888 25.916L19.639 41.356L22.535 35.38L28.288 38.693L23.291 22.452Z" fill="#FFB38D"/>
          <path d="M11.783 25.737L8.317 36.999L6.445 33.137L2.726 35.279L6.344 23.522C5.871 23.196 5.427 22.834 4.999 22.453L0 38.695L5.754 35.382L8.65 41.358L13.402 25.918C12.853 25.887 12.313 25.829 11.783 25.737Z" fill="#FFB38D"/>
          <path d="M13.545 8.87196V15.578H15.145V6.28296L11.587 8.06296L12.303 9.49296L13.545 8.87196Z" fill="white"/>
          <path d="M16.745 15.578H11.545V17.178H16.745V15.578Z" fill="whiteurrentColor"/>
        </svg>
      );

    // AIGAIGateway nodes
    case 'hackathons':
      return (
        <svg viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style={{ width: '64px', height: '64px' }}>
          <path d="M2.5 2.748C1.976 2.748 1.549 2.321 1.549 1.797C1.549 1.273 1.976 0.846 2.5 0.846C3.024 0.846 3.451 1.273 3.451 1.797C3.451 2.321 3.024 2.748 2.5 2.748ZM2.5 0.971C2.044 0.971 1.674 1.341 1.674 1.797C1.674 2.253 2.044 2.623 2.5 2.623C2.956 2.623 3.326 2.253 3.326 1.797C3.326 1.341 2.956 0.971 2.5 0.971Z" fill="#FF671B"/>
          <path d="M3.214 2.599C3.181 2.629 3.146 2.658 3.109 2.683L3.392 3.602L3.102 3.434L2.956 3.736L2.684 2.856C2.643 2.863 2.601 2.868 2.558 2.871L2.929 4.077L3.156 3.609L3.605 3.868L3.214 2.599Z" fill="#FFB38D"/>
          <path d="M2.316 2.856L2.044 3.736L1.898 3.434L1.608 3.602L1.891 2.683C1.854 2.658 1.819 2.629 1.786 2.599L1.395 3.868L1.844 3.609L2.071 4.077L2.442 2.871C2.399 2.868 2.357 2.863 2.316 2.856Z" fill="#FFB38D"/>
          <path d="M2.453 1.538V2.063H2.578V1.336L2.301 1.476L2.356 1.587L2.453 1.538Z" fill="#727271"/>
          <path d="M2.703 2.063H2.297V2.188H2.703V2.063Z" fill="#535351"/>
        </svg>
      );

    case 'events':
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M47.73 13.042H16.53L17.149 11.443H47.357L47.73 13.042Z" fill="#727271"/>
          <path d="M16.2038 33.916C15.3328 27.761 13.0048 22.54 9.79083 19.887L8.80083 19.069L9.97183 18.541C13.4188 16.987 15.8338 13.815 16.4328 10.134H6.17983V40.534H8.97683C9.13183 41.124 9.35483 41.663 9.66983 42.134H4.57983V8.534H18.2048L18.1328 9.4C17.7818 13.628 15.3508 17.384 11.6938 19.46C14.9418 22.722 17.2168 28.414 17.9368 34.905C17.3478 34.423 16.7698 34.093 16.2038 33.916Z" fill="#FF671B"/>
          <path d="M46.1539 34.927C46.8709 28.427 49.1469 22.725 52.3999 19.459C48.7429 17.383 46.3109 13.626 45.9619 9.39899L45.8899 8.53299H59.5139V42.133H54.4459C54.7709 41.614 55.0039 41.081 55.1399 40.533H57.9139V10.133H47.6609C48.2589 13.815 50.6729 16.987 54.1209 18.54L55.2919 19.068L54.3019 19.886C51.0859 22.541 48.7569 27.767 47.8879 33.927C47.2699 34.125 46.6979 34.478 46.1539 34.927Z" fill="#FF671B"/>
          <path d="M36.7088 55.466H27.3518V49.576H28.9508V53.867H35.1098V49.576H36.7088V55.466Z" fill="#727271"/>
          <path d="M25.0319 50.51L24.0999 48.956L25.9219 45.919C26.5609 44.853 27.2339 44.41 27.9289 44.601C28.6079 44.789 28.9509 45.484 28.9509 46.666V49.575H27.3509V46.666V46.647C27.3329 46.677 27.3129 46.709 27.2919 46.742L25.0319 50.51Z" fill="#727271"/>
          <path d="M38.9979 50.461L36.7669 46.742C36.7469 46.71 36.7279 46.68 36.7089 46.65V46.667V49.576H35.1089V46.667C35.1089 45.484 35.4529 44.79 36.1319 44.602C36.8229 44.412 37.4989 44.854 38.1389 45.92L39.9309 48.907L38.9979 50.461Z" fill="#727271"/>
          <path d="M5.29092 53.867L3.91992 53.042L8.19492 45.918C8.83292 44.853 9.50692 44.41 10.2009 44.601C10.8799 44.789 11.2239 45.484 11.2239 46.666V49.575H9.62392V46.666V46.65C9.60492 46.679 9.58692 46.71 9.56692 46.742L5.29092 53.867Z" fill="#727271"/>
          <path d="M23.3148 53.867L19.0398 46.743C19.0198 46.71 19.0008 46.68 18.9818 46.65V46.667V49.576H17.3818V46.667C17.3818 45.484 17.7258 44.79 18.4038 44.602C19.0958 44.412 19.7708 44.854 20.4108 45.92L24.6848 53.043L23.3148 53.867Z" fill="#727271"/>
          <path d="M40.6859 53.866L39.3149 53.044L43.5889 45.92C44.2279 44.854 44.8999 44.411 45.5949 44.602C46.2739 44.79 46.6169 45.485 46.6169 46.667V49.576H45.0169V46.667V46.65C44.9979 46.679 44.9789 46.71 44.9599 46.742L40.6859 53.866Z" fill="#727271"/>
          <path d="M58.7079 53.866L54.4329 46.742C54.4119 46.71 54.3929 46.679 54.3749 46.648V46.661V49.576H52.7749V46.667C52.7749 45.484 53.1189 44.79 53.7969 44.602C54.4869 44.412 55.1639 44.854 55.8039 45.919L60.0779 53.044L58.7079 53.866Z" fill="#736670"/>
          <path d="M18.982 55.466H9.62402V49.576H11.224V53.867H17.382V49.576H18.982V55.466Z" fill="#727271"/>
          <padwidth="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M22.1391 41.191H20.5391V53.622H22.1391V41.191Z" fill="#B8B8B8"/>
          <path d="M34.6721 17.888H29.3381V19.488H34.6721V17.888Z" fill="#FFB38D"/>
          <path d="M16.8051 41.191H15.2051V53.622H16.8051V41.191Z" fill="#B8B8B8"/>
          <path d="M43.4721 41.191H41.8721V53.622H43.4721V41.191Z" fill="#B8B8B8"/>
          <path d="M48.8051 41.191H47.2051V53.622H48.8051V41.191Z" fill="#B8B8B8"/>
          <path d="M32.8051 10.995V5.35501H31.2051V10.995C31.4711 10.979 31.7351 10.954 32.0051 10.954C32.2751 10.954 32.5391 10.979 32.8051 10.995Z" fill="#FF671B"/>
          <path d="M32.0051 14.155C36.6161 14.155 40.4881 17.34 41.5651 21.622H43.2151C42.1631 16.702 37.9451 12.953 32.8051 12.596C32.5401 12.578 32.2751 12.556 32.0051 12.556C31.7351 12.556 31.4711 12.578 31.2051 12.596C26.0651 12.953 21.8481 16.702 20.7961 21.622H22.4461C23.5231 17.339 27.3941 14.155 32.0051 14.155Z" fill="#B8B8B8"/>
          <path d="M16.8051 24.822H47.2051V36.39H48.8051V23.222H45.0321H43.4311H41.8311H40.2311H23.7801H22.1791H20.5801H18.9791H15.2051V36.39H16.8051V24.822Z" fill="#727271"/>
          <pawidth="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M48.6959 54.269H15.0959V10.002H40.6959V18.002H48.6959V54.269ZM16.6959 52.669H47.0959V19.602H39.0959V11.602H16.6959V52.669Z" fill="#FF671B"/>
          <path d="M40.6701 9.9652L39.5366 11.0958L47.5365 19.116L48.67 17.9854L40.6701 9.9652Z" fill="#FF671B"/>
          <path d="M23.896 23.3361H21.229V24.9361H23.896V23.3361Z" fill="#FF671B"/>
          <path d="M42.563 23.3361H26.563V24.9361H42.563V23.3361Z" fill="#B8B8B8"/>
          <path d="M23.896 28.6689H21.229V30.2689H23.896V28.6689Z" fill="#FF671B"/>
          <path d="M42.563 28.6689H26.563V30.2689H42.563V28.6689Z" fill="#B8B8B8"/>
          <path d="M23.896 34.002H21.229V35.602H23.896V34.002Z" fill="#FF671B"/>
          <path d="M42.563 34.002H26.563V35.602H42.563V34.002Z" fill="#B8B8B8"/>
          <path d="M23.896 39.3361H21.229V40.9361H23.896V39.3361Z" fill="#FF671B"/>
          <path d="M42.563 39.3361H26.563V40.9361H42.563V39.3361Z" fill="#B8B8B8"/>
          <path d="M23.896 44.6689H21.229V46.2689H23.896V44.6689Z" fill="#FF671B"/>
          <path d="M42.563 44.6689H26.563V46.2689H42.563V44.6689Z" fill="#B8B8B8"01 32.0878 35.201C34.2698 35.201 36.0448 36.975 36.0448 39.157C36.0448 41.338 34.2698 43.114 32.0878 43.114ZM32.0878 36.8C30.7888 36.8 29.7318 37.858 29.7318 39.157C29.7318 40.457 30.7898 41.514 32.0878 41.514C33.3878 41.514 34.4458 40.456 34.4458 39.157C34.4458 37.858 33.3878 36.8 32.0878 36.8Z" fill="#B8B8B8"/>
          <path d="M49.7549 43.114C47.5729 43.114 45.7979 41.339 45.7979 39.157C45.7979 36.975 47.5729 35.201 49.7549 35.201C51.9369 35.201 53.7108 36.975 53.7108 39.157C53.7108 41.338 51.9369 43.114 49.7549 43.114ZM49.7549 36.8C48.4549 36.8 47.3979 37.858 47.3979 39.157C47.3979 40.457 48.4559 41.514 49.7549 41.514C51.0539 41.514 52.1119 40.456 52.1119 39.157C52.1119 37.858 51.0539 36.8 49.7549 36.8Z" fill="#B8B8B8"/>
        </svg>
      );

    case 'university':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M3.5 9.6 12 5.3l8.5 4.3L12 14 3.5 9.6Z" stroke="currentColor" strokeWidth="1.7" opacity="0.9" />
          <path d="M6.4 11.2v5.2c0 .8.5 1.6 1.3 1.9 1.1.5 2.6.9 4.3.9 1.7 0 3.2-.4 4.3-.9.8-.3 1.3-1.1 1.3-1.9v-5.2" stroke="currentColor" strokeWidth="1.7" opacity="0.85" />
          <path d="M20.5 9.6v4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    case 'publications':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M7.2 3.9h7.9l2.6 2.6v13.6c0 1-.8 1.9-1.9 1.9H7.2c-1 0-1.9-.8-1.9-1.9V5.8c0-1 .8-1.9 1.9-1.9Z" stroke="currentColor" strokeWidth="1.7" opacity="0.92" />
          <path d="M15.1 3.9v3.2c0 .8.6 1.4 1.4 1.4h3.2" stroke="currentColor" strokeWidth="1.7" opacity="0.75" />
          <path d="M8.4 11.1h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8.4 14.6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        </svg>
      );

    // Product icons
    case 'product.fraudRisk':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M12 2.6 20 6.4v6.1c0 5-3.4 8.8-8 9.9-4.6-1.1-8-4.9-8-9.9V6.4L12 2.6Z" stroke="currentColor" strokeWidth="1.7" opacity="0.92" />
          <path d="M9 12.3l2 2.1 4.8-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'product.identity':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M12 12.2c2.1 0 3.8-1.7 3.8-3.8S14.1 4.6 12 4.6 8.2 6.3 8.2 8.4s1.7 3.8 3.8 3.8Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M5.2 20.2c1.3-3.2 4-5 6.8-5s5.5 1.8 6.8 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );

    case 'product.cyber':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M12 3.1 19.6 6.6v6c0 4.6-3 8.1-7.6 9.3-4.6-1.2-7.6-4.7-7.6-9.3v-6L12 3.1Z" stroke="currentColor" strokeWidth="1.7" opacity="0.92" />
          <path d="M12 9.5v5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10.2 9.9a2 2 0 1 1 3.6 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );

    case 'product.personalization':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M12 20.8s-7.2-4.2-7.2-10.3c0-2.3 1.8-4.2 4.1-4.2 1.4 0 2.6 0.7 3.1 1.7 0.5-1 1.7-1.7 3.1-1.7 2.3 0 4.1 1.9 4.1 4.2 0 6.1-7.2 10.3-7.2 10.3Z" stroke="currentColor" strokeWidth="1.7" opacity="0.92" />
          <path d="M9.3 12.1h5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'product.tokenization':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M7.2 9.3V7.6c0-2.7 2.2-4.9 4.9-4.9s4.9 2.2 4.9 4.9v1.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M6.2 9.3h11.6c1 0 1.9.8 1.9 1.9v7.3c0 1-.8 1.9-1.9 1.9H6.2c-1 0-1.9-.8-1.9-1.9v-7.3c0-1 .8-1.9 1.9-1.9Z" stroke="currentColor" strokeWidth="1.7" opacity="0.92" />
          <path d="M12 13.2v2.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'product.insights':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M4.2 18.7V5.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.85" />
          <path d="M4.2 18.7h15.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.85" />
          <path d="M7.3 14.4 10.1 11.7 12.4 13.9 17.1 9.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return null;
  }
}

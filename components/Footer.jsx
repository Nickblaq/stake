import {RiTelegramLine} from 'react-icons/ri'
import {BsFacebook, BsInstagram} from 'react-icons/bs'

const Footer = () => {

    return (
        <>
        <div>
        <footer className=" px-4 py-5 max-w-screen-xl mx-auto">
           
            <div className="mt-8 items-center justify-between sm:flex">
                <div className="my-6">
                    &copy; 2022 Chase Fintoken All rights reserved.
                </div>
                <div className="my-6">
                <ul className="flex items-center space-x-4">
                    <a
                                  target="_blank" rel="noopener noreferrer"
                                href='https://medium.com/@jardondr'
                                >
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <svg viewBox="0 0 81 81" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1rem" width="auto" className="Footer-icon-medium"><path d="M67.5 10.125h-54a3.375 3.375 0 00-3.375 3.375v54a3.375 3.375 0 003.375 3.375h54a3.375 3.375 0 003.375-3.375v-54a3.375 3.375 0 00-3.375-3.375zm-6.905 14.394l-3.26 3.122a.946.946 0 00-.358.915v22.953a.945.945 0 00.358.915l3.179 3.125v.689H44.513v-.689l3.297-3.2c.328-.323.328-.421.328-.914V32.879L38.97 56.153h-1.24L27.061 32.88v15.6a2.174 2.174 0 00.594 1.792l4.29 5.2v.686H19.78v-.685l4.29-5.201a2.086 2.086 0 00.553-1.793V30.442a1.58 1.58 0 00-.513-1.333l-3.814-4.59v-.685H32.13l9.146 20.058 8.04-20.058h11.282v.685h-.003z"></path></svg>
                        </li>

                        </a>
                        <a 
                          target="_blank" rel="noopener noreferrer"
                          href='https://twitter.com/chasefintoken'
                        >
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                           
                            <svg viewBox="0 0 81 81" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1rem" width="auto" className="h-6 w-6"><path d="M66.262 26.99c.044.59.044 1.178.044 1.765 0 17.972-13.679 38.68-38.677 38.68-7.702 0-14.857-2.23-20.878-6.105 1.093.125 2.146.17 3.284.17a27.236 27.236 0 0016.878-5.81 13.62 13.62 0 01-12.714-9.426c.84.125 1.684.21 2.569.21 1.218 0 2.443-.17 3.58-.463a13.59 13.59 0 01-10.9-13.341v-.17a13.718 13.718 0 006.142 1.725 13.575 13.575 0 01-6.062-11.32c0-2.524.672-4.84 1.85-6.858A38.667 38.667 0 0039.41 30.274a15.451 15.451 0 01-.338-3.115 13.587 13.587 0 0113.595-13.595c3.915 0 7.448 1.64 9.932 4.293a26.856 26.856 0 008.627-3.284 13.567 13.567 0 01-5.977 7.493 27.245 27.245 0 007.826-2.106 29.176 29.176 0 01-6.814 7.03z"></path></svg>
                        </li>
                        </a>
                        <a
                             target="_blank" rel="noopener noreferrer"
                             href='https://t.me/CHASEFINTOKEN1'       
                                >
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <RiTelegramLine className='w-6 h-6' />
                        </li>
                        </a>
                        <a
                             target="_blank" rel="noopener noreferrer"
                             href='https://facebook.com/chasefintoken'       
                                >
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <BsFacebook />
                        </li>
                        </a>
                        <a
                             target="_blank" rel="noopener noreferrer"
                             href='https://instagram.com/chasefintoken?igshid=YmMyMTA2M2Y='       
                                >
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <BsInstagram />
                        </li>
                        </a>
                    </ul>
                </div>
            </div>
            <style jsx>{`
                .svg-icon path,
                .svg-icon polygon,
                .svg-icon rect {
                    fill: currentColor;
                }
            `}</style>
        </footer>
        </div>
        </>
    )
}

export default Footer;
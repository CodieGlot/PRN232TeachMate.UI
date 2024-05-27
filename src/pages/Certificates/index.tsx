import { ChangeEvent, useEffect, useState } from 'react';
import { Header } from '../../layouts';
import AOS from 'aos';
import 'aos/dist/aos.css';
import toast from 'react-hot-toast';
import { CertificateService, StorageService } from '../../services';
import { Certificate } from '../../interfaces';
import { useNavigate } from "react-router-dom";

export function UploadCertificate() {
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [certificate, setCertificate] = useState<Certificate>();
  const [title, setTitle] = useState('');
  const [dateClaimed, setDateClaimed] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    AOS.init();
  }, []);
  // Function to handle file selection
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Assuming single file selection
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    } else {
      setFileName('');
    }
  };

  const handleFileDelete = () => {
    setFileName('');
    setSelectedFile(null);
    const fileInput = document.getElementById('file') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const uploadCertificate = async () => {
    try {
      if (selectedFile) {
        const linkDownload = await StorageService.uploadFile(selectedFile)
        const data = await CertificateService.uploadCertificate({
          certificateFile: linkDownload,
          dateClaimed,
          description,
          title
        });
        setCertificate(data);
        toast.success("Upload file successfully")
        navigate("/TutorDetail")
      }
    } catch (error) {
      console.error("Fail to upload: ", error)
    }
    console.log(certificate)
  }
  return (
    <>
      <Header />
      <div className="text-center mx-auto py-2">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400">Upload certificate</span></h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Upload certificate for more teaching opportunity</p>
      </div>
      <div className="flex items-center justify-center p-2">
        <div className="mx-auto w-full max-w-[600px] bg-white">
          <form className="py-6 px-9">
            <div className="mb-5">
              <label htmlFor="title" className="mb-3 block text-base font-medium text-[#07074D]">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                id="title"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                Date
              </label>
              <input
                value={dateClaimed}
                onChange={(e) => setDateClaimed(e.target.value)}
                type="date"
                name="date"
                id="date"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="title" className="mb-3 block text-base font-medium text-[#07074D]">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="desc"
                cols={50}
                id="desc"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl font-semibold text-[#07074D]">Upload File</label>

              <div className="mb-8">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="sr-only"
                  onChange={handleFileChange} // Handle file selection change
                />
                <label
                  htmlFor="file"
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                  <div>
                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                      {fileName ? fileName : 'Drop files here'}
                    </span>
                    <span className="mb-2 block text-base font-medium text-[#6B7280]">Or</span>
                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                      Browse
                    </span>
                  </div>
                </label>
              </div>
              {fileName && (
                <div data-aos="zoom-in" data-aos-duration="1000">
                  <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                    <div className="flex items-center justify-between">
                      <span className="truncate pr-3 text-base font-medium text-[#07074D]">{fileName}</span>
                      <button className="text-[#07074D]" onClick={handleFileDelete}>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div>
              <button
                type='button'
                onClick={uploadCertificate}
                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Upload certificate
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

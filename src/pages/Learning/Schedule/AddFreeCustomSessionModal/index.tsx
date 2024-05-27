"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { AuthService } from "../../../../services";
import { ScheduleService } from "../../../../services/ScheduleService";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

interface AddFreeCustomSessionModalProps {
    learningModuleId: number | undefined;
}

export function AddFreeCustomSessionModal({ learningModuleId }: AddFreeCustomSessionModalProps) {
    const user = AuthService.getCurrentUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("07:00");
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [linkMeet, setLinkMeet] = useState<string>("");

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const onCloseModal = () => {
        setIsModalOpen(false);
        setTitle("");
        setStartTime("07:00");
        setDate(new Date().toISOString().split('T')[0]);
        setLinkMeet("");
    };

    const handleCreateNewCustomSession = async () => {
        try {
            if (typeof learningModuleId === 'undefined') {
                throw new Error("learningModuleId is required");
            }
            await ScheduleService.createFreeLearningSession({
                title,
                learningModuleId,
                startTime,
                linkMeet,
                date
            });
            window.location.reload();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<any>;
                if (axiosError.response) {
                    const { data } = axiosError.response;
                    if (data) {
                        if (data.errors) {
                            Object.values(data.errors).forEach((errMsgList) => {
                                (errMsgList as string[]).forEach((errMsg: string) => {
                                    toast.error(errMsg);
                                });
                            });
                        } else if (data.message) {
                            toast.error(data.message);
                        }
                    } else {
                        toast.error("An unknown error occurred.");
                    }
                }
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    return (
        <>
            {user?.tutor !== null && (
                <Button color="gray" onClick={toggleModal}>Add free session</Button>
            )}

            <Modal color="gray" show={isModalOpen} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add free session</h3>
                        <p className="text-sm text-gray-400">Free session must be add before start date of the learning module</p>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="title" value="Title" />
                            </div>
                            <TextInput
                                id="title"
                                placeholder="Type session title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="start-time" value="Start time" />
                            </div>
                            <TextInput
                                id="start-time"
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                                min="09:00"
                                max="18:00"
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="date" value="Date" />
                            </div>
                            <TextInput
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="linkMeet" value="Link online session" />
                            </div>
                            <TextInput
                                id="linkMeet"
                                placeholder="Type link"
                                value={linkMeet}
                                onChange={(e) => setLinkMeet(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex gap-5">
                        <div >
                            <Button color="gray" onClick={handleCreateNewCustomSession}>Add</Button>
                        </div>
                        <div >
                            <Button color="gray" onClick={onCloseModal}>Cancel</Button>
                        </div>
                        </div>
                        
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

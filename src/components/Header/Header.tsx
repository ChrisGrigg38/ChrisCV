import { PersonalInfo } from "@/types/types"
import { FC } from "react"
import HeaderItem from "../HeaderItem/HeaderItem"
import { Mail, Phone, MapPin, Linkedin, Github, Youtube } from 'lucide-react';
import React from "react";

export interface HeaderProps {
    personalInfo: PersonalInfo
}

const Header: FC<HeaderProps> = ({personalInfo}) => {

    return (
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-8">
            <div className="flex items-center gap-8">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover hidden md:flex"
                />
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
                        <p className="text-xl text-blue-100">{personalInfo.title}</p>
                    </div>
                    <div className="flex gap-2 text-sm flex-wrap md:grid md:grid-cols-2">
                        <HeaderItem isLink linkUrl={`mailto:${personalInfo.email}`} text={personalInfo.email} iconComponent={ <Mail size={16} />} />
                        <HeaderItem text={personalInfo.phone} iconComponent={ <Phone size={16} />} />
                        <HeaderItem text={personalInfo.address} iconComponent={ <MapPin size={16} />} />
                        <HeaderItem isLink linkUrl={personalInfo.linkedin} text={personalInfo.linkedin} iconComponent={  <Linkedin size={16} />} />
                        <HeaderItem isLink linkUrl={personalInfo.github} text={personalInfo.github} iconComponent={  <Github size={16} />} />
                        <HeaderItem isLink linkUrl={personalInfo.youtube} text={personalInfo.youtube} iconComponent={  <Youtube size={16} />} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Header)
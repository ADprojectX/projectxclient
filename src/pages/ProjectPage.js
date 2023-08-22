import SideNavBar from "../components/SideBar";
import './css/ProjectPage.css'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {userLoggedIn} from '../auth/userLoggedIn';

const REQ_BASE_URL = process.env.REACT_APP_REQ_BASE_URL;

function ProjectPage() {
  
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const { currentUser } = userLoggedIn();
    const fireid = currentUser.uid

    useEffect(() => {
        axios.get(`${REQ_BASE_URL}/get-project?fireid=${fireid}`, { withCredentials: true })
            .then(response => {
                const sortedProjects = response.data.sort((a, b) => new Date(b.created) - new Date(a.created));
                setProjects(sortedProjects);
            })
            .catch(error => {
                console.error('Failed to fetch projects:', error);
            });
    }, []);

    function handleProjectClick(projectId) {
        localStorage.setItem('reqid', projectId);
        navigate('/video');
    }

    function handleCreateProject() {
        navigate('/dashboard');
    }

    return (
        <div className="project-page">
            <SideNavBar />
            <div className="project-page-main">
                <h2>Projects</h2>
                {
                    projects.length > 0 ?
                    (
                        <div className="project-grid">
                            {projects.map(project => (
                                <div key={project.id} className="project-item" onClick={() => handleProjectClick(project.id)}>
                                    <p>{project.topic || "Untitled"}</p>
                                    <p>Created: {new Date(project.created).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    ) :
                    (
                        <div className="no-projects">
                            <p>No projects available.</p>
                            <button onClick={handleCreateProject}>Create New Project</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ProjectPage;

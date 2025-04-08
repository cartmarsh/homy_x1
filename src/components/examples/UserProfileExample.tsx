import { useState, useEffect } from 'react';
import { createResource, ResourceLoader } from '../suspense/SuspenseResource';

// Simulated API call
const fetchUserData = (userId: string): Promise<any> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve({
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://via.placeholder.com/150',
        bio: 'Frontend developer with a passion for retro UI design',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js']
      });
    }, 2000); // 2 second delay to demonstrate loading
  });
};

export function UserProfileExample() {
  const [userId, setUserId] = useState<string>('user-123');
  const [resource, setResource] = useState(() => createResource(fetchUserData(userId)));

  // Re-create resource when userId changes
  useEffect(() => {
    setResource(createResource(fetchUserData(userId)));
  }, [userId]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Profile Example</h2>
      
      {/* User selector */}
      <div className="mb-6">
        <label className="block mb-2">Select User ID:</label>
        <select 
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="user-123">User 123</option>
          <option value="user-456">User 456</option>
          <option value="user-789">User 789</option>
        </select>
      </div>
      
      {/* User profile with Suspense and RetroLoader */}
      <div className="border rounded-lg overflow-hidden">
        <ResourceLoader
          resource={resource}
          loaderProps={{
            duration: 2670,
            primaryText: "LOADING PROFILE",
            accentText: `RETRIEVING USER ${userId}...`
          }}
        >
          {(userData) => (
            <div className="p-6">
              <div className="flex items-center mb-6">
                <img 
                  src={userData.avatar} 
                  alt={userData.name} 
                  className="w-16 h-16 rounded-full mr-4" 
                />
                <div>
                  <h3 className="text-xl font-bold">{userData.name}</h3>
                  <p className="text-gray-600">{userData.email}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold mb-2">Bio</h4>
                <p>{userData.bio}</p>
              </div>
              
              <div>
                <h4 className="font-bold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill: string) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </ResourceLoader>
      </div>
      
      <p className="mt-4 text-sm text-gray-500">
        Note: This example demonstrates using RetroLoader with Suspense for data fetching.
        Try changing the user to see the loader in action.
      </p>
    </div>
  );
}

export default UserProfileExample; 
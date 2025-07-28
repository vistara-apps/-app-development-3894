import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export function DataProvider({ children }) {
  const [debates, setDebates] = useState([]);
  const [exclusiveData, setExclusiveData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data
  useEffect(() => {
    const mockDebates = [
      {
        id: 1,
        topic: "Is LeBron James the GOAT over Michael Jordan?",
        status: "active",
        participants: 24,
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        winner: null,
        sport: "Basketball"
      },
      {
        id: 2,
        topic: "Will the Chiefs repeat as Super Bowl champions?",
        status: "active",
        participants: 18,
        startTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        endTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
        winner: null,
        sport: "Football"
      },
      {
        id: 3,
        topic: "Messi vs Ronaldo: Who had the better career?",
        status: "completed",
        participants: 45,
        startTime: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        endTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        winner: "messi_supporters",
        sport: "Soccer"
      }
    ];

    const mockExclusiveData = [
      {
        id: 1,
        title: "Advanced NBA Analytics Package",
        description: "Comprehensive player efficiency ratings, shot charts, and predictive models for all 30 NBA teams.",
        type: "analytics",
        price: "$15",
        downloadCount: 1247,
        isPremium: true
      },
      {
        id: 2,
        title: "NFL Draft Projection Model",
        description: "AI-powered draft projections based on college performance, combine metrics, and historical data.",
        type: "predictions",
        price: "$25",
        downloadCount: 823,
        isPremium: true
      },
      {
        id: 3,
        title: "Premier League Performance Insights",
        description: "Deep dive into team tactics, player heat maps, and expected goals (xG) analysis.",
        type: "analytics",
        price: "$12",
        downloadCount: 654,
        isPremium: true
      }
    ];

    setDebates(mockDebates);
    setExclusiveData(mockExclusiveData);
  }, []);

  const createDebate = (topic, sport) => {
    const newDebate = {
      id: Date.now(),
      topic,
      sport,
      status: "active",
      participants: 1,
      startTime: new Date(),
      endTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      winner: null
    };
    
    setDebates(prev => [newDebate, ...prev]);
    return newDebate;
  };

  const joinDebate = (debateId) => {
    setDebates(prev => prev.map(debate => 
      debate.id === debateId 
        ? { ...debate, participants: debate.participants + 1 }
        : debate
    ));
  };

  const value = {
    debates,
    exclusiveData,
    loading,
    createDebate,
    joinDebate,
    setLoading
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User as UserIcon, 
  Edit, 
  Trash, 
  UserPlus,
  Shield,
  ShieldX,
  UserRound
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

// Type des utilisateurs
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  active: boolean;
}

// Données de démonstration pour les utilisateurs
const initialUsers: User[] = [
  {
    id: "1",
    name: "Administrateur",
    email: "admin@example.com",
    role: "admin",
    active: true
  },
  {
    id: "2",
    name: "Utilisateur",
    email: "user@example.com",
    role: "user",
    active: true
  },
  {
    id: "3",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "user",
    active: true
  },
  {
    id: "4",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    role: "user",
    active: false
  }
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrage des utilisateurs
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    // Validation basique
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont obligatoires",
        variant: "destructive",
      });
      return;
    }

    // Ajouter l'utilisateur
    const id = (users.length + 1).toString();
    setUsers([
      ...users,
      {
        id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role as "admin" | "user",
        active: true
      }
    ]);

    // Réinitialiser et fermer
    setNewUser({ name: "", email: "", password: "", role: "user" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Succès",
      description: "Utilisateur créé avec succès",
    });
  };

  const handleEditUser = () => {
    if (!currentUser) return;
    
    // Mettre à jour l'utilisateur
    setUsers(users.map(user => 
      user.id === currentUser.id ? currentUser : user
    ));
    
    setIsEditDialogOpen(false);
    toast({
      title: "Succès",
      description: "Utilisateur mis à jour avec succès",
    });
  };

  const handleDeleteUser = () => {
    if (!currentUser) return;
    
    // Supprimer l'utilisateur
    setUsers(users.filter(user => user.id !== currentUser.id));
    
    setIsDeleteDialogOpen(false);
    toast({
      title: "Suppression",
      description: "Utilisateur supprimé avec succès",
    });
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ));
    
    toast({
      title: "Statut modifié",
      description: "Le statut de l'utilisateur a été mis à jour",
    });
  };

  const toggleUserRole = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: user.role === "admin" ? "user" : "admin" } : user
    ));
    
    toast({
      title: "Rôle modifié",
      description: "Le rôle de l'utilisateur a été mis à jour",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Input
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          <UserIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.role === "admin" ? (
                        <Shield className="h-4 w-4 text-blue-500" />
                      ) : (
                        <UserRound className="h-4 w-4 text-gray-500" />
                      )}
                      {user.role === "admin" ? "Administrateur" : "Utilisateur"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={user.active}
                      onCheckedChange={() => toggleUserStatus(user.id)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setCurrentUser(user);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleUserRole(user.id)}
                      >
                        {user.role === "admin" ? (
                          <ShieldX className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Shield className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setCurrentUser(user);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog d'ajout d'utilisateur */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un utilisateur</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input 
                id="name" 
                value={newUser.name} 
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                placeholder="Nom de l'utilisateur"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={newUser.email} 
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                placeholder="Email de l'utilisateur"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input 
                id="password" 
                type="password" 
                value={newUser.password} 
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                placeholder="Mot de passe initial"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="role"
                  checked={newUser.role === "admin"}
                  onCheckedChange={(checked) => 
                    setNewUser({...newUser, role: checked ? "admin" : "user"})
                  }
                />
                <Label htmlFor="role">
                  {newUser.role === "admin" ? "Administrateur" : "Utilisateur"}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button onClick={handleAddUser}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog d'édition d'utilisateur */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier un utilisateur</DialogTitle>
          </DialogHeader>
          {currentUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nom</Label>
                <Input 
                  id="edit-name" 
                  value={currentUser.name} 
                  onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  value={currentUser.email} 
                  onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Rôle</Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="edit-role"
                    checked={currentUser.role === "admin"}
                    onCheckedChange={(checked) => 
                      setCurrentUser({...currentUser, role: checked ? "admin" : "user"})
                    }
                  />
                  <Label htmlFor="edit-role">
                    {currentUser.role === "admin" ? "Administrateur" : "Utilisateur"}
                  </Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Statut</Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="edit-status"
                    checked={currentUser.active}
                    onCheckedChange={(checked) => 
                      setCurrentUser({...currentUser, active: checked})
                    }
                  />
                  <Label htmlFor="edit-status">
                    {currentUser.active ? "Actif" : "Inactif"}
                  </Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button onClick={handleEditUser}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de suppression d'utilisateur */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer un utilisateur</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
            {currentUser && (
              <p className="font-bold mt-2">
                {currentUser.name} ({currentUser.email})
              </p>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Cette action est irréversible.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteUser}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;

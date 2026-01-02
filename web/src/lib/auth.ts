export function getLoggedInUser() {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
}

export function isAdmin() {
    const user = getLoggedInUser();
    return user?.role === 'Admin';
}

export function isLoggedIn() {
    return getLoggedInUser() !== null;
}

export async function logout() {
    try {
        const user = getLoggedInUser();
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        await fetch(`${apiUrl}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user?.id,
                email: user?.email
            })
        }).catch(() => {
            console.log('API logout failed, but continuing');
        });

        localStorage.removeItem('user');
        window.location.href = '/auth/login';
    } catch (error) {
        console.error('Logout error:', error);
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
    }
}
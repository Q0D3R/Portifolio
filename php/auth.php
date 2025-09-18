<!-- PHP Backend (in the same file for demo, but should be in separate .php files in production) -->
<?php
session_start();
header('Content-Type: application/json');

function respond($success, $message) {
  echo json_encode(['success' => $success, 'message' => $message]);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_POST['action'] ?? '';
  $usersFile = __DIR__ . '/users.json';

  // Simple file-based user storage (for demo only)
  if (!file_exists($usersFile)) file_put_contents($usersFile, '{}');
  $users = json_decode(file_get_contents($usersFile), true);

  if ($action === 'register') {
    $name = trim($_POST['name'] ?? '');
    $email = strtolower(trim($_POST['email'] ?? ''));
    $password = $_POST['password'] ?? '';
    if (!$name || !$email || !$password) respond(false, 'All fields are required.');
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) respond(false, 'Invalid email address.');
    if (isset($users[$email])) respond(false, 'Email already registered.');
    if (strlen($password) < 6) respond(false, 'Password must be at least 6 characters.');
    $users[$email] = [
      'name' => htmlspecialchars($name),
      'password' => password_hash($password, PASSWORD_DEFAULT)
    ];
    file_put_contents($usersFile, json_encode($users));
    respond(true, 'Registration successful! You can now log in.');
  }

  if ($action === 'login') {
    $email = strtolower(trim($_POST['email'] ?? ''));
    $password = $_POST['password'] ?? '';
    if (!$email || !$password) respond(false, 'All fields are required.');
    if (!isset($users[$email])) respond(false, 'No account found with that email.');
    if (!password_verify($password, $users[$email]['password'])) respond(false, 'Incorrect password.');
    $_SESSION['user'] = $users[$email]['name'];
    respond(true, 'Login successful! Welcome, ' . $users[$email]['name'] . '.');
  }

  if ($action === 'forgot') {
    $email = strtolower(trim($_POST['email'] ?? ''));
    if (!$email) respond(false, 'Please enter your email.');
    if (!isset($users[$email])) respond(false, 'No account found with that email.');
    // In real app, send email. Here, just simulate.
    respond(true, 'A password reset link has been sent to your email (simulated).');
  }
}
?>

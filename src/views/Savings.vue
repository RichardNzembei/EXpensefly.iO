<template>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">Savings</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="home.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="Expenses.html">Expenses</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="Targets.html">Targets</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="Savings.html">Savings</a>
                    </li>
                </ul>
                <button class="btn btn-outline-success me-2">Profile</button>
            </div>
        </div>
    </nav>

    <div class="custom-container container">
        
        <h1>Savings</h1>
        <p>View your current savings and manage your finances efficiently.</p>

        <!-- Savings form -->
        <form id="savingsForm">
            <div class="mb-3">
                <label for="savingsMethod" class="form-label">Savings Method:</label>
                <select class="form-select" id="savingsMethod">
                    <option value="M-Shwari">M-Shwari</option>
                    <option value="Bank">Bank</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="savingsDate" class="form-label">Date:</label>
                <input type="date" class="form-control" id="savingsDate" required>
            </div>
            <div class="mb-3">
                <label for="savingsAmount" class="form-label">Amount:</label>
                <input type="number" class="form-control" id="savingsAmount" placeholder="Enter amount" required>
            </div>
            <button type="submit" class="btn btn-primary">Add Savings</button>
        </form>

        <!-- Container for displaying recent savings -->
        <div id="recentSavings"></div>

        <!-- Placeholder for the "Show All Savings" button -->
        <div id="showAllSavingsPlaceholder"></div>
        <canvas id="savingsChart" width="800" height="400"></canvas>
    </div>

    <!-- Footer -->
    <footer class="text-muted text-center py-3">
        <p>&copy; 2024 Expense Tracker. @Reubeb Devs</p>
    </footer>
</template>
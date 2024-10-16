<template>
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">Expenses</a>
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
    <div class="container">
        <h1>Expenses</h1>
        <p>View and manage your expenses here.</p>

        <!-- Expense filter form -->
        <form id="expenseFilterForm" class="row g-3">
            <div class="col-md-4">
                <label for="categoryFilter" class="form-label">Filter by Category:</label>
                <select class="form-select" id="categoryFilter">
                    <option value="">All</option>
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Utilities">Utilities</option>
                    <!-- Add more categories as needed -->
                </select>
            </div>
            <div class="col-md-4">
                <label for="dateFilter" class="form-label">Filter by Date:</label>
                <input type="date" class="form-control" id="dateFilter">
            </div>
            <div class="col-md-4">
                <button type="submit" class="btn btn-primary">Apply Filters</button>
            </div>
        </form>

        <!-- Display filtered expenses here -->
        <div id="spendings"></div>

        <!-- Canvas for graph -->
        <canvas id="expenseChart" width="800" height="400" class="mt-5"></canvas>
    </div>

    <!-- Footer -->
    <footer class="text-muted">
        <div class="container">
            <p>&copy; 2024 Expense Tracker. @Reubeb Devs</p>
        </div>
    </footer>
</template>
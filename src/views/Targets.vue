<template>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">targets</a>
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
        <h1>Targets</h1>
        <p>Set financial goals and track your progress towards achieving them.</p>

        <!-- Email Input Field -->
        <label for="emailInput" class="form-label">Enter your Gmail address for reminders:</label>
        <input type="email" id="emailInput" class="form-control mb-3" placeholder="example@gmail.com" required>

        <!-- Targets form -->
        <form id="targetsForm">
            <div class="mb-3">
                <label for="targetDescription" class="form-label">Description:</label>
                <input type="text" id="targetDescription" class="form-control" placeholder="Enter description" required>
            </div>
            <div class="mb-3">
                <label for="targetAmount" class="form-label">Target Amount:</label>
                <input type="number" id="targetAmount" class="form-control" placeholder="Enter target amount" required>
            </div>
            <div class="mb-3">
                <label for="targetDeadline" class="form-label">Deadline:</label>
                <input type="date" id="targetDeadline" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Set Target</button>
        </form>

        <!-- Container for displaying undone targets -->
        <div>
            <h2 class="mt-4">Undone Targets</h2>
            <div id="undoneTargetsList"></div>
        </div>

        <!-- Container for displaying done targets -->
        <div>
            <h2 class="mt-4">Done Targets</h2>
            <div id="doneTargetsList"></div>
        </div>
    </div>
</template>